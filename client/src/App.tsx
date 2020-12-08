import React, {useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import "./styles/tailwind.css";
import { Layout } from './components';
import { Home, Organization, Users} from './containers';

function App() { 
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/organization">
            <Organization />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;