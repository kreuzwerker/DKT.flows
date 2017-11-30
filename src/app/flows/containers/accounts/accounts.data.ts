/* tslint:disable: ter-max-len */
import { Account } from './../../models';

export let ACCOUNTS_DATA: Account[] = [
  {
    name: 'Example S3 account',
    type: 'aws',
    credentials: [
      {
        name: 'access_key',
        value: 'xyz1'
      },
      {
        name: 'secret_access_key',
        value: 'abc1'
      }
    ],
  },
  {
    name: 'Kreuzwerker S3 account',
    type: 'aws',
    credentials: [
      {
        name: 'access_key',
        value: 'xyz2'
      },
      {
        name: 'secret_access_key',
        value: 'abc2'
      }
    ],
  }
];
