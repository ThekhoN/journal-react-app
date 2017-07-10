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
    .then(response => response.json())
    .then(responseJson => {
      // if req is good & auth'd
      // update state to auth'd
      dispatch({type: AUTH_USER});
      dispatch({type: 'FETCH_USER_EMAIL', payload: email});
      // save JWT in localStorage
      localStorage.setItem('token', responseJson.token);
      localStorage.setItem('userEmail', email);
    })
    .catch((err) => {
      dispatch(authError('Your email or password is incorrect. \n Please try again.'));
    });
  };
};

export const signoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userEmail');
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
      if (responseJson.error) {
        dispatch(authError(responseJson.error));
        return false;
      } else {
        dispatch({type: AUTH_USER});
        dispatch({type: 'FETCH_USER_EMAIL', payload: email});
        localStorage.setItem('token', responseJson.token);
        localStorage.setItem('userEmail', email);
      }
    })
    .catch(err => {
      console.log('error in signupUser: ', err);
      // dispatch(authError(err.response.data.error));
      dispatch(authError('Error in signup...'));
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

// author ~ email
export const submitEntryDispatcher = ({author, text, tag}) => {
  if (!tag) {
    tag = [];
  }
  return function (dispatch) {
    dispatch({type: 'SUBMIT_USER_ENTRY', payload: {author, text, tag}});
    // dispatch(submitEntrySubmitting('submitting'));
    return fetch(`${ROOT_URL}/entry`, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({
        author,
        text,
        tag
      })
    })
    .then(response => response.json())
    .then(responseJson => {
      console.log('responseJson: ', responseJson);
      if (responseJson.error) {
        // dispatch(submitEntryError(responseJson.error));
        return false;
      } else {
        console.log('responseJson: ', responseJson);
        // dispatch(submittedEntrySubmitting('submitted'));
      }
    })
    .catch(err => {
      console.log('error in submitEntry: ', err);
      // dispatch(submitEntryError('Error in submitEntry'));
    });
  }
};
