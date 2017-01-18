import ApolloClient, { createNetworkInterface } from 'apollo-client';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    // DKT Mock API
    uri: 'https://api.graph.cool/simple/v1/ciy0ib4ja13ay01441ubnmo7z'
  }),
  // ID mapping required for automatic updates of objects in the store after
  // mutations.
  dataIdFromObject: o => o['id'],
  // Enable Apollo Dev Tools Extension
  connectToDevTools: true
});

export function provideClient(): ApolloClient {
  return client;
}
