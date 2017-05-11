import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/dist/aws-sdk.min';
import * as AWSCognito from 'amazon-cognito-identity-js';
import { CognitoUtil, UserState } from './../';

export interface IUserRegistration {
  email?: string;
  givenName?: string;
  familyName?: string;
  username?: string;
  password?: string;
}

@Injectable()
export class UserRegistrationService {

  public static signUp(signUpData: IUserRegistration): Promise<void> {

    let attributeList: AWSCognito.CognitoUserAttribute[] = [];

    let dataEmail: AWSCognito.ICognitoUserAttributeData = {
      Name: 'email',
      Value: signUpData.email
    };

    let dataGivenName: AWSCognito.ICognitoUserAttributeData = {
      Name: 'given_name',
      Value: signUpData.givenName
    };

    let dataFamilyName: AWSCognito.ICognitoUserAttributeData = {
      Name: 'family_name',
      Value: signUpData.familyName
    };

    let attributeEmail = new AWSCognito.CognitoUserAttribute(dataEmail);
    let attributeGivenName = new AWSCognito.CognitoUserAttribute(dataGivenName);
    let attributeFamilyName = new AWSCognito.CognitoUserAttribute(dataFamilyName);

    attributeList.push(attributeEmail);
    attributeList.push(attributeGivenName);
    attributeList.push(attributeFamilyName);

    let promise: Promise<void> = new Promise<void>((resolve, reject) => {
      CognitoUtil.getUserPool().signUp(
        signUpData.username,
        signUpData.password,
        attributeList,
        undefined,
        (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          console.log('Username is ' + result.user.getUsername());
          console.log('Sign-up successful!');

          // Update user state to 'pendingConfirmation'
          CognitoUtil.setUsername(signUpData.username);
          CognitoUtil.setUserState(UserState.PendingConfirmation);

          // Sign-up successful. Callback without error.
          resolve();
        }
      );
    });
    return promise;
  }

  public static confirmSignUp(confirmationCode: string): Promise<void> {
    let cognitoUser = CognitoUtil.getCognitoUser();
    let promise: Promise<void> = new Promise<void>((resolve, reject) => {
      cognitoUser.confirmRegistration(confirmationCode, true, (err: Error, data: any) => {
        if (err) {
          reject(err);
          return;
        }
        CognitoUtil.setUserState(UserState.SignedIn);
        resolve(data);
      });
    });
    return promise;
  }

  public static resendConfirmationCode(): Promise<void> {
    let cognitoParams = {
      ClientId: CognitoUtil.getClientId(),
      Username: CognitoUtil.getUsername()
    };

    let promise: Promise<void> = new Promise<void>((resolve, reject) => {
      new AWS.CognitoIdentityServiceProvider().resendConfirmationCode(
        cognitoParams,
        (err: Error, data: any) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(data);
        }
      );
    });
    return promise;
  }
}
