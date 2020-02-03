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

const isLoggedInAction = error => ({
  type: 'IS_LOGGED_IN',
  payload: error,
});


const userPostSignUp = (history, {
  name, email, password, passwordConfirmation,
}) => dispatch => {
  console.log('action', history, name, email, password, passwordConfirmation);
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
      console.log('ok fetch', response);
      if (response.status === 201) {
        dispatch(SignUpUserAction(response.data));
        localStorage.setItem('token', response.data.auth_token);
        history.push('/main');
        // handleSuccessfulAuth(response.data);
      }
    })
    .catch(error => {
      console.log('registration error', error);
      dispatch(FailureAction(error));
    });
};

const userPostLogin = (history, {
    email, password,
  }) => dispatch => {
    console.log('action Login', history, email, password);
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
        console.log('ok fetch Login', response);
        if (response.status === 200) {
          dispatch(loginUserAction(response.data));
          localStorage.setItem('token', response.data.auth_token);
          history.push('/main');
          console.log('enter')
          // handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        console.log('registration error', error);
        dispatch(FailureAction(error));
      });
  };

  const checkingIsLogged = () => dispatch => {
    const token = localStorage.token;
    if (token){
      axios
      .get(
        '/nutrients',
        {
          headers: {
            Authorization: `Bearer ${ token }`
          }
        },
        { withCredentials: true },
      )
      .then(response => {
        console.log('ok check is log', response);
        if (response.status === 200) {
          dispatch(isLoggedInAction());
          console.log('enter')
        }
      })
      .catch(error => {
        console.log('registration error', error);
        localStorage.removeItem("token");
      });
    }
      
  };


/*

  export const userLoginFetch = user => {
    return dispatch => {
      return fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({user})
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
            // Here you should

  export const userLoginFetch = user => {
    return dispatch => {
      return fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({user})
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
            // Here you should have logic to handle invalid login credentials.
            // This assumes your Rails API will return a JSON object with a key of
            // 'message' if there is an error
          } else {
            localStorage.setItem("token", data.jwt)
            dispatch(loginUser(data.user))
          }
        })
    }
  }

  export const getProfileFetch = () => {
    return dispatch => {
      const token = localStorage.token;
      if (token) {
        return fetch("http://localhost:3000/api/v1/profile", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
          .then(resp => resp.json())
          .then(data => {
            if (data.message) {
              // An error will occur if the token is invalid.
              // If this happens, you may want to remove the invalid token.
              localStorage.removeItem("token")
            } else {
              dispatch(loginUser(data.user))
            }
          })
      }
    }
  }

  export const logoutUser = () => ({
    type: 'LOGOUT_USER'
  }) have logic to handle invalid login credentials.
            // This assumes your Rails API will return a JSON object with a key of
            // 'message' if there is an error
          } else {
            localStorage.setItem("token", data.jwt)
            dispatch(loginUser(data.user))
          }
        })
    }
  }

  export const getProfileFetch = () => {
    return dispatch => {
      const token = localStorage.token;
      if (token) {
        return fetch("http://localhost:3000/api/v1/profile", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
          .then(resp => resp.json())
          .then(data => {
            if (data.message) {
              // An error will occur if the token is invalid.
              // If this happens, you may want to remove the invalid token.
              localStorage.removeItem("token")
            } else {
              dispatch(loginUser(data.user))
            }
          })
      }
    }
  }

  export const logoutUser = () => ({
    type: 'LOGOUT_USER'
  }) */

export  {userPostSignUp, userPostLogin, checkingIsLogged};
