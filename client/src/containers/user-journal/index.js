import React, {Component} from 'react';
import Entries from '../entries';
import Header from '../../components/header';
import WriteEntry from '../write-entry';

class UserJournal extends Component {
  componentDidMount () {
    // this.handleFetchUserEmail
  }
  render () {
    return (
      <div>
        <Header />
        <br />
        <WriteEntry />
        <br />
        <Entries />
      </div>
    );
  }
}

export default UserJournal;
