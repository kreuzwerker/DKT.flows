import ApolloClient, { createNetworkInterface } from 'apollo-client';

export const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    // DKT Mock API
    // uri: 'https://api.graph.cool/simple/v1/ciy0ib4ja13ay01441ubnmo7z'
    // DKT Dev API
    uri: 'https://m0zw22d92f.execute-api.eu-west-1.amazonaws.com/Dev'
  }),
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
