import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { UserLoginService } from './core/services';
import { each } from 'lodash';

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
    req.options.headers['authorization'] = UserLoginService.getIdToken();
    next();
  }
};

const handleErrors = ({ response }, next) => {
  // clone response so we can turn it into json independently
  const res = response.clone();
  // if it's not user error, we skip this afterware (for example a 401)
  if (!res.ok) {
    // handle network errors based on res.status here, for example:
    if (res.status === 500) {
      console.log('TODO show user message: internal server error');
    }
    return next();
  }

  // handle apollo errors
  res.json().then(json => {
    each(json.data, data => {
      if (data && data.errors && data.errors.length) {
        console.log('TODO show user message', data.errors[0]);
      }
    });
    next();
  });
};

networkInterface.use([authMiddleware]);
networkInterface.useAfter([
  {
    applyAfterware: handleErrors
  }
]);

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
