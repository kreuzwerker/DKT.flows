import { Injectable } from '@angular/core';
import { CognitoUtil, LocalStorage, Logger } from './../';

export class UserProfileService {
  public static getUserAttributes() {
    let promise: Promise<Object> = new Promise<Object>((resolve, reject) => {
      let cognitoUser = CognitoUtil.getCognitoUser();
      cognitoUser.getSession((err: Error, session: any) => {
        if (err) {
          reject(err);
          return;
        }
        cognitoUser
        cognitoUser.getUserAttributes((err: Error, result: any) => {
          if (err) {
            reject(err);
            return;
          }
          let userAttributes = {};

          for (var i = 0; i < result.length; i++) {
            userAttributes[result[i].getName()] = result[i].getValue();
          }
          console.log('%cCognito User Pools User Attributes: ', Logger.LeadInStyle, userAttributes);
          // Write user profile attributes to local storage
          LocalStorage.setObject('userProfile', userAttributes);
          resolve(userAttributes);
        });
      })
    });
    return promise;
  }
}