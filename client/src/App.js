import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import { ApolloServer, ApolloClient } from '@apollo/client';

const client = new ApolloClient({
  req: op => {
    const token = localStorage.getItem('id_token')
    op.setCount({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: 'graphql'
});

function App() {
  return (
    <ApolloClient client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchBooks} />
            <Route exact path='/saved' component={SavedBooks} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloClient>
  );
}

export default App;
