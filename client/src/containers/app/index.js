import React from 'react';
import Test from '../../components/test';
import Signin from '../signin';
import Entries from '../entries';
import {Route, BrowserRouter as Router} from 'react-router-dom';

const Home = () => (
  <div>
    <Test />
    <br />
    <Signin />
  </div>
);

const About = () => (
  <h3>About Component</h3>
);

const AuthdLandingComponent = () => (
  <h3>AuthdLanding Component</h3>
);

const App = () => (
  <div className='react-app'>
    <Home />
    <Entries />
  </div>
);

export default App;
