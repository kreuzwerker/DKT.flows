import ApolloClient, { createNetworkInterface } from 'apollo-client';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    // DKT Mock API
    uri: 'https://api.graph.cool/simple/v1/ciy0ib4ja13ay01441ubnmo7z'
  }),
  connectToDevTools: true
});

export function provideClient(): ApolloClient {
  return client;
}
