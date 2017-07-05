import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ROOT_URL} from '../../api';
import {getEntriesDispatcher} from '../../actions/actionCreators';

const dummyEntries = [
  {
    '_id': '59521a8db6ed881d0841643c',
    'text': 'test Hello',
    'author': 'User1',
    '__v': 0,
    'tag': [],
    'updated': '2017-06-27T08:42:53.762Z'
  },
  {
    '_id': '5954a5918ff3221d00371c7c',
    'text': 'test  Today was a good day and it just gets better and better',
    'author': 'Thekho Ngaosathe',
    '__v': 0,
    'tag': [],
    'updated': '2017-06-29T07:00:33.351Z'
  },
  {
    '_id': '5954cbfeecf73629b8172894',
    'text': 'test Train yourself to let go of everything you fear to lose',
    'author': 'Yoda',
    '__v': 0,
    'tag': [],
    'updated': '2017-06-29T09:44:30.430Z'
  }
];

export class Entries extends Component {
  componentDidMount () {
    this.props.handleGetEntries(ROOT_URL);
  }
  render () {
    const {data} = this.props;
    // const data = dummyEntries;
    return (
      <div>
        {
          data.map(entry => (
            <div key={entry.text}>
              {entry.text}
            </div>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.entries.data
});
const mapDispatchToProps = dispatch => ({
  handleGetEntries: (url) => {
    dispatch(getEntriesDispatcher(url));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Entries);
