import React, {Component} from 'react';
import Signin from '../signin';
import WelcomeHeader from '../../components/welcome-header';
import {Link} from 'react-router-dom';

class LandingAuth extends Component {
  render () {
    return (
      <div>
        <WelcomeHeader />
        <br />
        <Signin />
        <br />
        <Link to='/signup'>
          Click here to sign up
        </Link>
      </div>
    );
  }
}

export default LandingAuth;
