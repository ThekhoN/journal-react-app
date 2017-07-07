import 'whatwg-fetch';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  GET_ENTRIES,
  LOADING_ENTRIES,
  LOADED_ENTRIES
} from './types';
import {ROOT_URL} from '../api';

/***********************************/
// AUTH
/***********************************/
export const authError = error => ({
  type: AUTH_ERROR,
  payload: error
});

export const signinUser = ({email, password}) => {
  return function (dispatch) {
    return fetch(`${ROOT_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    // .post(`${ROOT_URL}/signin`, {email, password})
    .then(response => response.json())
    .then(responseJson => {
      console.log('responseJson: ', responseJson);
      // if req is good & auth'd
      // update state to auth'd
      dispatch({type: AUTH_USER});
      // save JWT in localStorage
      localStorage.setItem('token', responseJson.token);
      console.log('saved token:', localStorage.getItem('token'));
    })
    .catch((err) => {
      // console.log('error in signinUser: ', err);
      dispatch(authError('Your email or password is incorrect. \n Please try again.'));
    });
  };
};

export const signoutUser = () => {
  return {
    type: UNAUTH_USER
  };
};

export const signupUser = ({email, password}) => {
  return function (dispatch) {
    return fetch(`${ROOT_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(response => response.json())
    .then(responseJson => {
      dispatch({type: AUTH_USER});
      localStorage.setItem('token', responseJson.data.token);
    })
    .catch(err => {
      // console.log('error in signupUser: ', err.response.data.error);
      dispatch(authError(err.response.data.error));
    });
  };
};

/*************************************************/
  // Journal
/*************************************************/
export const getEntries = payload => {
  return {
    type: GET_ENTRIES,
    payload
  };
};
export const getEntriesError = error => ({
  type: 'GET_ENTRIES_ERROR',
  payload: error
});
export const loadingEntries = payload => {
  return {
    type: LOADING_ENTRIES,
    payload
  };
};
export const loadedEntries = payload => {
  return {
    type: LOADED_ENTRIES,
    payload
  };
};

export const errMessageGetEntriesError = 'ERROR in GET_ENTRIES';

export const getEntriesDispatcher = (url) => {
  return function (dispatch) {
    dispatch(loadingEntries('loading'));
    return fetch(url)
    .then(response => response.json())
    .then(json => {
      dispatch(getEntries(json));
      dispatch(loadedEntries('loaded'));
    })
    .catch(err => dispatch(getEntriesError(errMessageGetEntriesError)));
  };
};
