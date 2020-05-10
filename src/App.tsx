import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Stats from './pages/Stats';
import Blank from './pages/Blank';

import './App.css';

const App: React.FC = () => {
  return (
    <Switch>
      <Route path='/stats' component={Stats} />
      <Route path='/explore' component={Blank} />
      <Route exact path='/' render={() => (<Redirect to='/stats' />)} />
    </Switch>
  );
}

export default App;
