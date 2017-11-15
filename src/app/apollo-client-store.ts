import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { UserLoginService } from './core/services';
import { each } from 'lodash';

function getApiUrl(): string {
  if (document.location.hostname.indexOf('dkt.flows.test') !== -1) {
    return 'https://x64ywwtnw3.execute-api.eu-west-1.amazonaws.com/Test';
  } else {
    return 'https://m0zw22d92f.execute-api.eu-west-1.amazonaws.com/Dev';
  }
}

function parseErrorMessage(message: string) {
  const parts = message.split('_');
  return {
    code: parts[0].toUpperCase(),
    entityType: parts[1].toLowerCase(),
  };
}

const networkInterface = createNetworkInterface({
  uri: getApiUrl()
});

const authMiddleware = {
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }

    UserLoginService.refreshTokens()
      .then(() => {
        // TODO figure out which token to send to the server in case the user has
        // authenticated with Google SignIn.
        //
        // console.log('idToken', UserLoginService.getIdToken());
        req.options.headers['authorization'] = UserLoginService.getIdToken();
        next();
      })
      .catch(err => {
        console.log('Failed to refresh token');
        // TODO don't next(), sign out and redirect to sign in view
        next();
      });
  }
};

const handleErrors = ({ response }, next) => {
  // clone response so we can turn it into json independently
  const res = response.clone();

  // if it's not user error, we skip this afterware (for example a 401)
  if (!res.ok) {
    // handle network errors based on res.status here, for example:
    if (res.status === 500) {
      window.DKT.showMessage('An error occured', 'error');
    }
    return next();
  }

  res.json().then(json => {
    if (json.errors) {
      const error = parseErrorMessage(json.errors[0].message);
      switch (error.code) {
        case 'E401':
          window.DKT.redirect(['error', '401', error.entityType]);
          break;
        case 'E404':
          window.DKT.redirect(['error', '404', error.entityType]);
          break;
        default:
          each(json.errors, error => {
            window.DKT.showMessage('An error occured', 'error');
          });
          break;
      }
    }
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
