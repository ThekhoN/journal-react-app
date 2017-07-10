import React from 'react';
import {connect} from 'react-redux';
import Header from '../../components/header';

const About = ({userEmail}) => (
  <div>
    <Header />
    <br />
    <h3>About my journey. . .</h3>
    email: <span className='special'>{userEmail}</span>
  </div>
);

const mapStateToProps = (state) => ({
  userEmail: state.userDetail.email
});

export default connect(mapStateToProps, null)(About);
