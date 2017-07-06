import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import nock from 'nock';
import moxios from 'moxios';
import {getEntriesDispatcher, loadingEntries} from '../../src/actions/actionCreators';
import {initialStateEntries} from '../../src/reducers/entries';

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

const dummyResponseString = {
  '_id': '59521a8db6ed881d0841643c',
  'text': 'Hello',
  'author': 'User1',
  '__v': 0,
  'tag': [],
  'updated': '2017-06-27T08:42:53.762Z'
};

const mockResponse = (status, statusText, response) => {
  return new window.Response(response, {
    status: status,
    statusText: statusText,
    header: {
      'Content-type': 'application/json'
    }
  });
};



it('calls LOADING_ENTRIES on initiating getEntriesDispatcher', () => {
  window.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve(mockResponse(200, null, JSON.stringify(dummyResponse)))
  );
  // const store = mockStore({ entries: [] });
  const store = mockStore(initialStateEntries);
  return store.dispatch(getEntriesDispatcher(mockUrl))
  .then(() => {
    const expectedActions = store.getActions();
    expect(expectedActions.length).toBe(1);
    expect(expectedActions).toContainEqual({type: 'LOADING_ENTRIES', payload: 'loading'});
    // expect(expectedActions).toContainEqual({type: types.FETCH_DATA_SUCCESS, data });
  });
});
