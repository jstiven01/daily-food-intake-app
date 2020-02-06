import axios from 'axios';

export const progressesRequest = () => ({
  type: 'PROGRESSES_REQUEST',
});

export const getProgressesSuccess = progresses => ({
  type: 'GET_PROGRESSES_SUCCESS',
  payload: progresses,
});

export const failureProgressRequest = error => ({
  type: 'FAILURE_PROGRESSES_REQUEST',
  payload: error,
});


export const getProgresses = () => dispatch => {
  const { token } = localStorage;
  dispatch(progressesRequest());
  axios
    .get(
      '/progresses',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      { withCredentials: true },
    )
    .then(response => {
      const progresses = response.data;
      dispatch(getProgressesSuccess(progresses));
    })
    .catch(error => {
      // error.message is the error message
      dispatch(failureProgressRequest(error.message));
    });
};
