import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Select from './components/Select';
import Artists from './components/Artists';
import Songs from './components/Songs';
import './App.css';

function App() {
  return (
    <Router basename='/'>
      <div className='App'>
        <Switch>
          <Route exact path='/'>
            <Homepage />
          </Route>
          <Route exact path='/select'>
            <Select />
          </Route>
          <Route exact path='/artists'>
            <Artists />
          </Route>
          <Route exact path='/songs'>
            <Songs />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
