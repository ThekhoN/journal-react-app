import {getEntriesDispatcher, loadingEntries} from '../../src/actions/actionCreators';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import nock from 'nock';
import moxios from 'moxios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockUrl = '/mock/api';
const dummyResponse = [
  {
    '_id': '59521a8db6ed881d0841643c',
    'text': 'Hello',
    'author': 'User1',
    '__v': 0,
    'tag': [],
    'updated': '2017-06-27T08:42:53.762Z'
  }
];

describe('getEntriesDispatcher actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  })
  it('creates type: LOADING_ENTRIES', () => {
    moxios.stubRequest(mockUrl, {
      status: 200,
      response: {
        data: dummyResponse
      }
    });

    const expectedActions = [
      {type: 'LOADING_ENTRIES'}
    ];
    // const store = mockStore({entries: {status:'', data: []}});
    const store = mockStore({ entries: [] });
    return store.dispatch(loadingEntries('loading'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

});
