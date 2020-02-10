import axios from 'axios';


const loginUserAction = userObj => ({
  type: 'LOGIN_USER',
  payload: userObj,
});

const SignUpUserAction = userObj => ({
  type: 'SIGN_UP_USER',
  payload: userObj,
});

const FailureAction = error => ({
  type: 'FAILURE',
  payload: error,
});

const FailureSignUpAction = error => ({
  type: 'FAILURE_SIGN_UP',
  payload: error,
});
const FailureLoginAction = error => ({
  type: 'FAILURE_LOGIN',
  payload: error,
});

const isLoggedInAction = error => ({
  type: 'IS_LOGGED_IN',
  payload: error,
});

const logOutUser = () => ({
  type: 'LOGOUT_USER',
});

const userPostSignUp = (history, {
  name, email, password, passwordConfirmation,
}) => dispatch => {
  axios
    .post(
      '/signup',
      {
        name,
        email,
        password,
        passwordConfirmation,
      },
      { withCredentials: true },
    )
    .then(response => {
      if (response.status === 201) {
        dispatch(SignUpUserAction(response.data));
        localStorage.setItem('token', response.data.auth_token);
        history.push('/main');
      }
    })
    .catch(error => {
      dispatch(FailureSignUpAction(error.response.data.message));
    });
};

const userPostLogin = (history, {
  email, password,
}) => dispatch => {
  axios
    .post(
      '/auth/login',
      {
        email,
        password,
      },
      { withCredentials: true },
    )
    .then(response => {
      if (response.status === 200) {
        dispatch(loginUserAction(response.data));
        localStorage.setItem('token', response.data.auth_token);
        history.push('/main');
      }
    })
    .catch(error => {
      dispatch(FailureLoginAction(error.response.data.message));
    });
};

const checkingIsLogged = history => dispatch => {
  const { token } = localStorage;
  if (token) {
    axios
      .get(
        '/nutrients',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        { withCredentials: true },
      )
      .then(response => {
        if (response.status === 200) {
          dispatch(isLoggedInAction());
        } else {
          dispatch(FailureAction('Different from status 200'));
          localStorage.removeItem('token');
          history.push('/');
        }
      })
      .catch(error => {
        localStorage.removeItem('token');
        dispatch(FailureAction(error));
        history.push('/');
      });
  } else {
    history.push('/');
  }
};


export {
  userPostSignUp, userPostLogin, checkingIsLogged, logOutUser,
};
