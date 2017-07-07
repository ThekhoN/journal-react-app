import {combineReducers} from 'redux';
import auth from './auth';
import entries from './entries';
import userEmail from './userEmail';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  auth,
  entries,
  userEmail,
  form: formReducer
});

export default rootReducer;
