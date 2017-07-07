import React from 'react';
import Signin from '../signin';
import Entries from '../entries';
import {Switch, Route, HashRouter as Router} from 'react-router-dom';
import Home from '../home';
import UserJournal from '../user-journal';
import Signout from '../signout';
import requireAuth from '../../HOC/requireAuth';

const About = () => (
  <h3>About Component</h3>
);

const AuthdLandingComponent = () => (
  <h3>AuthdLanding Component</h3>
);

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
        <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;
