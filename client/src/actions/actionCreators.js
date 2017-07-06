// import axios from 'axios';
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
    return axios
    .post(`${ROOT_URL}/signin`, {email, password})
    .then(response => {
      console.log('response: ', response);
      // if req is good & auth'd
      // update state to auth'd
      dispatch({type: AUTH_USER});
      // save JWT in localStorage
      localStorage.setItem('token: ', response.data.token);
    })
    .catch((err) => {
      console.log('error in signinUser: ', err);
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
    return axios
    .post(`${ROOT_URL}/signup`, {email, password})
    .then(response => {
      dispatch({type: AUTH_USER});
      localStorage.setItem('token', response.data.token);
    })
    .catch(err => {
      console.log('error in signupUser: ', err.response.data.error);
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

// export const getEntriesDispatcher = (url) => {
//   return function (dispatch) {
//     dispatch(loadingEntries('loading'));
//     return axios
//     .get(url)
//     .then(response => {
//       // dispatch(getEntries(response.data));
//       setTimeout(() => {
//         // dispatch(loadedEntries('loaded'));
//       }, 1600);
//     });
//   };
// };

export const getEntriesError = error => ({
  type: 'GET_ENTRIES_ERROR',
  payload: error
});

export const getEntriesDispatcher = (url) => {
  return function (dispatch) {
    dispatch(loadingEntries('loading'));
    return fetch(url)
    .then(response => response.json())
    .then(json => {
      // dispatch(getEntries(json));
      // setTimeout(() => {
      //   dispatch(loadedEntries('loaded'));
      // }, 1600);
    })
    .catch(err => {
      // console.log('error in fetch getEntriesDispatcher: ', err);
      // dispatch(getEntriesError(err));
    });
  };
};
