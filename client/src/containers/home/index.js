import React, {Component} from 'react';
import Header from '../../components/header';
import Signin from '../signin';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

export class Home extends Component {
  render () {
    const {authenticated} = this.props;
    if (authenticated) {
      return (
        <Redirect to='/user' />
      );
    }
    return (
      <Signin />
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

export default connect(mapStateToProps, null)(Home);
