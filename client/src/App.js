import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

// integrate Apollo server into the front end of application
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// establish a new link to the GraphQL server/endpoint
const httpLink = createHttpLink({
  // uri: 'http://localhost:3001/graphql',
  uri: '/graphql',
});

// ApolloClient() constructor to instantiate the Apollo Client and create the connection to the API endpoint
  // also instantiates a new cache
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

function App() {
  return (
    // enable entire app to interact with ApolloClient instance
    <ApolloProvider client={client}>
      <div className='flex-column justify-flex-start min-100-vh'>
        <Header />
        <div className='container'>
          <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;

// server environment runs at localhost:3001
// React environment runs at localhost:3000
  // localhost:3001/graphql
