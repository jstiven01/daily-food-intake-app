const initialState = {
  currentUser: {},
  errorSignUp: '',
  errorLogin: '',
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
    case 'IS_LOGGED_IN':
      return { ...state, isLogged: true };
    case 'FAILURE':
      return { currentUser: {}, error: action.payload, isLogged: false };
    case 'FAILURE_SIGN_UP':
      return {
        currentUser: {}, errorSignUp: action.payload, isLogged: false, errorLogin: '',
      };
    case 'FAILURE_LOGIN':
      return {
        currentUser: {}, errorLogin: action.payload, isLogged: false, errorSignUp: '',
      };
    default:
      return state;
  }
}
