import {combineReducers} from 'redux';
import auth from './auth';
import entries from './entries';
import userDetail from './userDetail';
import userEntry from './userEntry';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  auth,
  entries,
  userDetail,
  userEntry,
  form: formReducer
});

export default rootReducer;
