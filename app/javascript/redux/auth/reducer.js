const initialState = {
  currentUser: {},
  error: '',
  isLogged: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_USER':
      return { ...state, currentUser: action.payload, isLogged: true };
    case 'LOGOUT_USER':
      return { ...state, currentUser: {}, isLogged: false };
    case 'SIGN_UP_USER':
      return { ...state, currentUser: action.payload, isLogged: true };
    case 'FAILURE':
      return { currentUser: {}, error: action.payload, isLogged: false };
    default:
      return state;
  }
}
