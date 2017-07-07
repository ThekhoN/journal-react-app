import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signoutUser} from '../../actions/actionCreators';

class Signout extends Component {
  componentWillMount () {
    this.props.handleSignoutUser();
  }
  render () {
    return (
      <div>
        Sorry to see you go. . .
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  handleSignoutUser: () => {
    dispatch(signoutUser());
  }
});

export default connect(null, mapDispatchToProps)(Signout);
