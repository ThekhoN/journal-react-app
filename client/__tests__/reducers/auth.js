import auth from '../../src/reducers/auth';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from '../../src/actions/types';

const initialState = {authenticated: false, error: ''};
const error = 'AUTH_ERROR DETECTED';

describe('auth reducer', () => {
  it ('returns proper initial state by default', () => {
    expect(auth(undefined, {})).toEqual(initialState);
  });
  it('authenticates user', () => {
    expect(auth(initialState, {
      type: AUTH_USER
    })).toEqual({
      ...initialState,
      authenticated: true
    });
  });
  it('unauthenticates user', () => {
    expect(auth(initialState, {
      type: UNAUTH_USER
    })).toEqual({
      ...initialState,
      authenticated: false
    });
  });
  it('dispatches error correctly', () => {
    expect(auth(initialState, {
      type: AUTH_ERROR,
      payload: error
    })).toEqual({
      ...initialState,
      error
    });
  });
});
