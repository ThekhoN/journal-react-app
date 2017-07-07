const userEmail = (state = {email: '', data: []}, action) => {
  switch (action.type) {
    case 'FETCH_USER_EMAIL':
      return {...state, email: action.payload};
    default:
      return state;
  }
};

export default userEmail;
