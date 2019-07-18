const infoReducer = (state, action) => {
  switch (action.type) {
  case 'ADD_INFO':
    return {
      ...state,
      name: action.payload.name,
      lastname: action.payload.lastname,
      city: action.payload.city,
      drinks: action.payload.drinks,
    };
  case 'ADD_PHOTO':
    return {
      ...state,
      photo: action.payload,
    };
  case 'ADD_LOGIN':
    return {
      ...state,
      login: action.payload,
    };
  default:
    return state;
  }
};

export default infoReducer;
