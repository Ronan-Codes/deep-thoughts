import React from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

// integrate Apollo server into the front end of application
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
// import React-Router-Dom
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Other page components
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

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
      {/* makes all child components aware of all client-side routing */}
      <Router>
        <div className='flex-column justify-flex-start min-100-vh'>
          <Header />

          <div className='container'>
            {/* <Home /> */}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              {/* '?' means it is optional. /profile is the logged in user's profile */}
              <Route exact path="/profile/:username?" component={Profile} />
              <Route exact path="/thought/:id" component={SingleThought} />

              {/* Catch-all , 404 message */}
              <Route component={NoMatch} />
            </Switch>
          </div>
          
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

// server environment runs at localhost:3001
// React environment runs at localhost:3000
  // localhost:3001/graphql
