import {
  GET_ENTRIES,
  LOADING_ENTRIES,
  LOADED_ENTRIES
} from '../actions/types';

export const initialStateEntries = {
  status: '',
  data: []
};

const entries = (state = initialStateEntries, action) => {
  switch (action.type) {
    case GET_ENTRIES:
      return {...state, data: action.payload};
    case LOADING_ENTRIES:
      return {...state, status: action.payload};
    case LOADED_ENTRIES:
      return {...state, status: action.payload};
    default:
      return state;
  }
};

export default entries;
