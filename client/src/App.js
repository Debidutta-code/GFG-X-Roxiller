// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Statistics from './components/Statistics';
import './App.css';


const App = () => {
  return (
    <Router>

      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/statistics/:month" component={Statistics} />
      </Switch>
    </Router>
  );
};

export default App;
