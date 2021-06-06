import React, { useState, useEffect } from 'react'
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client'
import AsyncStorage from '@react-native-community/async-storage'
import { persistCache } from 'apollo3-cache-persist';
import { setContext } from '@apollo/client/link/context';
import GitRepository from './src/Component/GitRepository';
const cache = new InMemoryCache()

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = "ghp_xxxxxxxxxxxxxx";
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
})


export default function App() {
  const [loadingCache, setLoadingCache] = useState(true)

  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
    }).then(() => setLoadingCache(false))
  }, [])
  
  return (
    <ApolloProvider client={client}>
      <GitRepository />
    </ApolloProvider>
  )
}