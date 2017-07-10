const userEntry = (state = {currentEntry: {text: '', tag: []}, allEntries: []}, action) => {
  switch (action.type) {
    case 'SUBMIT_USER_ENTRY':
      return {...state, currentEntry: action.payload};
    default:
      return state;
  }
};

export default userEntry;
