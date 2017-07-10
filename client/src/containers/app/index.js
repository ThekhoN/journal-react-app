import React from 'react';
import Signin from '../signin';
import Entries from '../entries';
import {Switch, Route, HashRouter as Router} from 'react-router-dom';
import Home from '../home';
import UserJournal from '../user-journal';
import Signout from '../signout';
import requireAuth from '../../HOC/requireAuth';
import Signup from '../signup';
import About from '../about';

const NotFound = () => (
  <h2>404 Not Found!</h2>
);

const App = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/user' component={requireAuth(UserJournal)} />
      <Route exact path='/about' component={requireAuth(About)} />
      <Route exact path='/signout' component={Signout} />
      <Route exact path='/signup' component={Signup} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;
