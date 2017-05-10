import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { UserLoginService } from './core/services';

const networkInterface = createNetworkInterface({
  // TODO use as soon as server-side authentication works for both UserPool and 
  // Google SignIn strategies.
  //
  // DKT Test API
  // uri: 'https://x64ywwtnw3.execute-api.eu-west-1.amazonaws.com/Test'

  // DKT Dev API
  uri: 'https://m0zw22d92f.execute-api.eu-west-1.amazonaws.com/Dev'
});

const authMiddleware = {
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
  
    // TODO figure out which token to send to the server in case the user has
    // authenticated with Google SignIn.
    //
    // console.log('idToken', UserLoginService.getIdToken());
    // req.options.headers['authorization'] = UserLoginService.getIdToken();
    next();
  }
};

networkInterface.use([authMiddleware]);

export const client = new ApolloClient({
  networkInterface,
  // ID mapping required for automatic updates of objects in the store after
  // mutations.
  dataIdFromObject: (result) => {
    if (result['id'] && result['__typename']) {
      return result['__typename'] + '_' + result['id'];
    }

    // Make sure to return null if this object doesn't have an ID
    return null;
  },
  // Enable Apollo Dev Tools Extension
  connectToDevTools: true
});

export function provideClient(): ApolloClient {
  return client;
}
