import { Injectable } from '@angular/core';

import 'aws-sdk/dist/aws-sdk.min.js';
declare var AWS:any;
import * as AWSCognito from 'amazon-cognito-identity-js';

import { CognitoUtil, UserProfileService, UserState, LocalStorage, Logger } from './../';
import * as sjcl from 'sjcl';

export interface IUserLogin {
  username?: string;
  password?: string;
}

@Injectable()
export class UserLoginService {

  private static _userTokens = {
    accessToken: undefined,
    idToken: undefined,
    refreshToken: undefined
  };

  public static getAccessToken() {
    let accessToken: string = UserLoginService._userTokens.accessToken;
    if (!accessToken) {
      // retrieve from Local Storage if it exists
      accessToken = LocalStorage.get('userTokens.accessToken');
      UserLoginService._userTokens.accessToken = accessToken;
    }
    return accessToken;
  };

  public static getIdToken() {
    let idToken: string = UserLoginService._userTokens.idToken;
    if (!idToken) {
      // retrieve from Local Storage if it exists
      idToken = LocalStorage.get('userTokens.idToken');
      UserLoginService._userTokens.idToken = idToken;
    }
    return idToken;
  };

  public static getRefreshToken() {
    let refreshToken: string = UserLoginService._userTokens.refreshToken;
    if (!refreshToken) {
      // retrieve from Local Storage if it exists
      refreshToken = LocalStorage.get('userTokens.refreshToken');
      UserLoginService._userTokens.refreshToken = refreshToken;
    }
    return refreshToken;
  }

  public static getAwsAccessKey() {
    if (AWS.config.credentials == null) {
      return LocalStorage.get('userTokens.awsAccessKeyId');
    }
    return AWS.config.credentials.accessKeyId || LocalStorage.get('userTokens.awsAccessKeyId');
  }

  public static getAwsSecretAccessKey() {
    return AWS.config.credentials.secretAccessKey || LocalStorage.get('userTokens.awsSecretAccessKey');
  }

  public static getAwsSessionToken() {
    return AWS.config.credentials.sessionToken || LocalStorage.get('userTokens.awsSessionToken');
  }

  public static clearUserState() {
    // Clear user tokens
    UserLoginService._userTokens = {
      accessToken: undefined,
      idToken: undefined,
      refreshToken: undefined
    };

    LocalStorage.set('userTokens.accessToken', null);
    LocalStorage.set('userTokens.idToken', null);
    LocalStorage.set('userTokens.refreshToken', null);
    LocalStorage.set('userTokens.awsAccessKeyId', null);
    LocalStorage.set('userTokens.awsSecretAccessKey', null);
    LocalStorage.set('userTokens.awsSessionToken', null);

    // Clear user state
    CognitoUtil.setUserState(UserState.SignedOut);

    // Clear user profile attributes
    LocalStorage.set('userProfile', null);

    // Clear username and user ID attributes
    LocalStorage.set('userId', null);
    LocalStorage.set('userName', null);
  };

  public static signIn(userLogin: IUserLogin): Promise<void> {
    let authenticationData = {
      Username: userLogin.username,
      Password: userLogin.password
    };

    let authenticationDetails = new AWSCognito.AuthenticationDetails(authenticationData);

    // Set user name
    CognitoUtil.setUsername(userLogin.username);
    console.log('Authenticating user ' + userLogin.username);

    let cognitoUser = CognitoUtil.getCognitoUser();
    let promise: Promise<void> = new Promise<void>((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          console.debug(result);
          // Save user tokens to local state
          UserLoginService._userTokens.accessToken = result.getAccessToken().getJwtToken();
          UserLoginService._userTokens.idToken = result.getIdToken().getJwtToken();
          UserLoginService._userTokens.refreshToken = result.getRefreshToken().getToken();


          LocalStorage.set('userTokens.idToken', UserLoginService._userTokens.idToken);
          console.log('%cCognito User Pools Identity Token: ', Logger.LeadInStyle, UserLoginService.getIdToken());
          LocalStorage.set('userTokens.accessToken', UserLoginService._userTokens.accessToken);
          console.log('%cCognito User Pools Access Token: ', Logger.LeadInStyle, UserLoginService.getAccessToken());
          LocalStorage.set('userTokens.refreshToken', UserLoginService._userTokens.refreshToken);
          console.log('%cCognito User Pools Refresh Token: ', Logger.LeadInStyle, UserLoginService.getRefreshToken());

          /*
           Extract the user group from the identity token.
           First, get the identity token payload and then perform a Base64 decoding
           so you can later extract the user group.
           */
          let idTokenPayload = UserLoginService._userTokens.idToken.split('.')[1];
          let payload = JSON.parse(sjcl.codec.utf8String.fromBits(sjcl.codec.base64url.toBits(idTokenPayload)));
          let userGroup = payload["cognito:groups"];
          if (userGroup && userGroup.length > 0) {
            LocalStorage.set('userGroup', userGroup);
          } else {
            /*
              The user group is set only for the pre-defined users. By default
              we assign them to client group.
             */
            userGroup = 'clientGroup';
            LocalStorage.set('userGroup', userGroup);
          }
          console.log('%cCognito User Pools User Groups :' + '%c%s belongs to group %s', Logger.LeadInStyle, "black",
            userLogin.username, userGroup);

          // Set user state to authenticated
          CognitoUtil.setUserState(UserState.SignedIn);

          // Read user attributes and write to console
          UserProfileService.getUserAttributes().then(() => {
            UserLoginService.getAwsCredentials().then(() => {
              LocalStorage.set('userId', CognitoUtil.getCognitoIdentityId());
              console.log('%cCognito Identity ID: ', Logger.LeadInStyle, CognitoUtil.getCognitoIdentityId());
              LocalStorage.set('userTokens.awsAccessKeyId', AWS.config.credentials.accessKeyId);
              console.log('%cAWS Access Key ID: ', Logger.LeadInStyle, AWS.config.credentials.accessKeyId);
              LocalStorage.set('userTokens.awsSecretAccessKey', AWS.config.credentials.secretAccessKey);
              console.log('%cAWS Secret Access Key: ', Logger.LeadInStyle, AWS.config.credentials.secretAccessKey);
              LocalStorage.set('userTokens.awsSessionToken', AWS.config.credentials.sessionToken);
              console.log('%cAWS Session Token: ', Logger.LeadInStyle, AWS.config.credentials.sessionToken);
            });
            resolve();
          }).catch((err) => {
            reject(err);
          });
        },
        onFailure: function (err) {
          // Check for user not confirmed exception
          if (err.code === 'UserNotConfirmedException') {
            // Set user state to pending confirmation
            CognitoUtil.setUserState(UserState.PendingConfirmation);
          } else {
            CognitoUtil.setUserState(UserState.InvalidCredentials);
          }
          reject(err);
        }
      });
    });
    return promise;
  }

  public static signInSocial(user) {
    let profile = user.getBasicProfile();
    let authResponse = user.getAuthResponse();

    // Set user name & profile picture
    CognitoUtil.setUsername(profile.getName());
    CognitoUtil.setUserProfile({
      imageUrl: profile.getImageUrl()
    });
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());

    AWS.config.region = CognitoUtil.getRegion();

    // Add the Google access token to the Cognito credentials login map.
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: CognitoUtil.getIdentityPoolId(),
      Logins: {
        'accounts.google.com': authResponse['id_token']
      }
    });

    UserLoginService._userTokens.idToken = authResponse['id_token'];
    LocalStorage.set('userTokens.idToken', UserLoginService._userTokens.idToken);
    console.log('%cCognito User Pools Identity Token: ', Logger.LeadInStyle, UserLoginService.getIdToken());

    // Obtain AWS credentials
    AWS.config.credentials.refresh(function(err){
      if (!err) {
        LocalStorage.set('userId', CognitoUtil.getCognitoIdentityId());
        console.log('%cCognito Identity ID: ', Logger.LeadInStyle, CognitoUtil.getCognitoIdentityId());
        LocalStorage.set('userTokens.awsAccessKeyId', AWS.config.credentials.accessKeyId);
        console.log('%cAWS Access Key ID: ', Logger.LeadInStyle, AWS.config.credentials.accessKeyId);
        LocalStorage.set('userTokens.awsSecretAccessKey', AWS.config.credentials.secretAccessKey);
        console.log('%cAWS Secret Access Key: ', Logger.LeadInStyle, AWS.config.credentials.secretAccessKey);
        LocalStorage.set('userTokens.awsSessionToken', AWS.config.credentials.sessionToken);
        console.log('%cAWS Session Token: ', Logger.LeadInStyle, AWS.config.credentials.sessionToken);
      }
    });
  }

  public static signOut() {
    // Clear local user state
    UserLoginService.clearUserState();
    // Logout from Cognito service
    CognitoUtil.getCognitoUser().signOut();
    AWS.config.credentials.clearCachedId();
  }

  public static globalSignOut() {
    // Clear local user state
    UserLoginService.clearUserState();
    // Logout from Cognito service
    CognitoUtil.getCognitoUser().globalSignOut({
      onSuccess: (msg) => {},
      onFailure: (err) => {}
    });
    AWS.config.credentials.clearCachedId();
  }

  public static getAwsCredentials(): Promise<void> {
    // TODO: Integrate this method as needed into the overall module
    let logins = {};

    let promise: Promise<void> = new Promise<void>((resolve, reject) => {
      // Check if user session exists
      CognitoUtil.getCognitoUser().getSession((err: Error, result: any) => {
        if (err) {
          reject(err);
          return;
        }


        logins['cognito-idp.' + CognitoUtil.getRegion() + '.amazonaws.com/' + CognitoUtil.getUserPoolId()] = result.getIdToken().getJwtToken();

        // Add the User's Id token to the Cognito credentials login map
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: CognitoUtil.getIdentityPoolId(),
          Logins: logins
        });

        console.log('AWS.config.credentials', AWS.config.credentials, AWS.CognitoIdentityCredentials)

        // Call refresh method to authenticate user and get new temp AWS credentials
        if (AWS.config.credentials.needsRefresh()) {
          AWS.config.credentials.clearCachedId();
          AWS.config.credentials.get((err) => {
            if (err) {
              reject(err);
              return;
            }
            resolve();
          });
        } else {
          AWS.config.credentials.get((err) => {
            if (err) {
              console.error(err);
              reject(err);
              return;
            }
            resolve();
          });
        }
      });
    });
    return promise;
  }

  public static isSignedIn(): boolean {
    let token = UserLoginService.getIdToken();
    return typeof token == 'string' && token != 'null';
  }

  /**
   * Password management
   */


  public static forgotPassword(username: string): Promise<void> {
    // Set target username
    CognitoUtil.setUsername(username);

    // Get Cognito User with session
    let cognitoUser = CognitoUtil.getCognitoUser();

    let promise: Promise<void> = new Promise<void>((resolve, reject) => {
      cognitoUser.forgotPassword({
        onSuccess: () => {
          console.log('Initiated reset password for username ' + username);
          resolve();
        },
        onFailure: (err) => {
          console.log('Failed to initiate reset password for username ' + username);
          reject(err);
          return;
        },
        inputVerificationCode() {
          console.log('Waiting for input of verification code')
          resolve();
        }
      });
    });
    return promise;
  }

  public static confirmForgotPassword(username: string, verificationCode: string, password: string): Promise<void> {
    // Set target username
    CognitoUtil.setUsername(username);

    // Get Cognito User with session
    let cognitoUser = CognitoUtil.getCognitoUser();

    let promise: Promise<void> = new Promise<void>((resolve, reject) => {
      cognitoUser.confirmPassword(verificationCode, password, {
        onSuccess: () => {
          console.log('Password successfully reset for username ' + username);
          resolve();
        },
        onFailure: (err) => {
          console.log('Password was not reset for username ' + username);
          console.log(`Error: ${err.name}. ${err.message}`);
          reject(err);
          return;
        }
      });
    });
    return promise;
  }

  // NB currently there's no UI implemented for this action
  public static changePassword(previousPassword: string, proposedPassword: string): Promise<void> {
    let promise: Promise<void> = new Promise<void>((resolve, reject) => {
      // first, load the valid tokens cached in the local store, if they are available
      // see: https://github.com/aws/amazon-cognito-identity-js/issues/71
      let cognitoUser = CognitoUtil.getCognitoUser();
      cognitoUser.getSession((err: Error, session: any) => {
        if (err) {
          reject(err);
          return;
        }
        cognitoUser.changePassword(previousPassword, proposedPassword, (err: Error, result: any) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        });
      });
    });
    return promise;
  }
}