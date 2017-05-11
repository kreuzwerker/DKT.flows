import { Injectable } from '@angular/core';

import 'aws-sdk/dist/aws-sdk.min.js';
declare var AWS: any;
import * as AWSCognito from 'amazon-cognito-identity-js';

import { awsConfig as Config } from './../../config';
import { LocalStorage } from './../';

export enum UserState {
  SignedOut = 0,
  SignedIn = 1,
  PendingConfirmation = 2,
  InvalidCredentials = 3
}

@Injectable()
export class CognitoUtil {

  private static _USER_POOL_ID = Config['USER_POOL_ID'];
  private static _CLIENT_ID: string = Config['CLIENT_ID'];
  private static _IDENTITY_POOL_ID: string = Config['IDENTITY_POOL_ID'];
  private static _REGION: string = Config['REGION'];


  public static getRegion(): string {
    return CognitoUtil._REGION;
  }

  public static getClientId(): string {
    return CognitoUtil._CLIENT_ID;
  }

  public static getIdentityPoolId(): string {
    return CognitoUtil._IDENTITY_POOL_ID;
  }

  public static getUserPoolId(): string {
    return CognitoUtil._USER_POOL_ID;
  }

  public static getCognitoIdentityId(): string {
    return AWS.config.credentials.identityId;
  }

  public static getUsername(): string {
    // Retrieve username from local storage. Return null if it does not exist
    return LocalStorage.get('userName');
  }

  public static setUsername(username: string) {
    LocalStorage.set('userName', username);
  }

  public static getUserId(): string {
    // Retrieve user ID from local storage. Return null if it does not exist
    return LocalStorage.get('userId');
  }

  public static getUserProfile(): Object {
    // Retrieve user profile attributes from local storage
    return LocalStorage.getObject('userProfile');
  }

  public static setUserProfile(userAttributes: object) {
    LocalStorage.setObject('userProfile', userAttributes);
  }

  public static getUserGroup(): string {
    // Retrieve the user group from the local storage
    return LocalStorage.get('userGroup');
  }

  public static getUserState(): UserState {
    // Retrieve user state from local storage. Return null if it does not exist

    switch (parseInt(LocalStorage.get('userState'), 10)) {
      case 0:
        return UserState.SignedOut;
      case 1:
        return UserState.SignedIn;
      case 2:
        return UserState.PendingConfirmation;
      case 3:
        return UserState.InvalidCredentials;
      default:
        return null;
    }
  }

  public static setUserState(userState: UserState) {
    LocalStorage.set('userState', JSON.stringify(userState));
  }

  public static getUserPool() {
    // Initialize Cognito User Pool
    let poolData: AWSCognito.ICognitoUserPoolData = {
      UserPoolId: CognitoUtil._USER_POOL_ID,
      ClientId: CognitoUtil._CLIENT_ID
    };

    // TODO REMOVE ?
    //
    // AWSCognito.config.region = CognitoUtil._REGION;
    // AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
    //   IdentityPoolId: CognitoUtil._IDENTITY_POOL_ID
    // });

    // Set Cognito Identity Pool details
    AWS.config.region = CognitoUtil._REGION;
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: CognitoUtil._IDENTITY_POOL_ID
    });

    // Initialize AWS config object with dummy keys - required if unauthenticated
    // access is not enabled for identity pool
    AWS.config.update({accessKeyId: 'dummyvalue', secretAccessKey: 'dummyvalue'});
    return new AWSCognito.CognitoUserPool(poolData);
  }

  public static getCognitoUser() {
    let username = LocalStorage.get('userName');

    let userData = {
      Username: username,
      Pool: CognitoUtil.getUserPool()
    };
    return new AWSCognito.CognitoUser(userData);
  }

  public static getCurrentUser() {
    return CognitoUtil.getUserPool().getCurrentUser();
  }
}
