import './style/style.css'
import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { HashRouter,Redirect ,Route, Switch} from "react-router-dom";

import SongList from './pages/SongList.js';
import SongCreate from './pages/SongCreate';
import SongDetails from './pages/SongDetails';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter >
      <Switch>
        <Route exact path="/"><SongList /></Route>
        <Route path="/songs/new"><SongCreate /></Route>
        <Route path="/songs/:id"><SongDetails /></Route>
        <Route path="*"><Redirect to="/" /></Route>
      </Switch>
      </HashRouter >
    </ApolloProvider >
  )
};


ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);

