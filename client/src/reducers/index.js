import {combineReducers} from 'redux';
import auth from './auth';
import entries from './entries';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  auth,
  entries,
  form: formReducer
});

export default rootReducer;
