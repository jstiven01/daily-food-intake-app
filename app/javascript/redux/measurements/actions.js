import axios from 'axios';

export const measurementsRequest = () => ({
  type: 'MEASUREMENTS_REQUEST',
});

export const getMeasurementsSuccess = measurements => ({
  type: 'GET_MEASUREMENTS_SUCCESS',
  payload: measurements,
});

export const getMeasurementsFailure = error => ({
  type: 'GET_MEASUREMENTS_FAILURE',
  payload: error,
});

export const postMeasurementsSuccess = measurements => ({
  type: 'POST_MEASUREMENTS_SUCCESS',
  payload: measurements,
});

export const postMeasurementsFailure = error => ({
  type: 'POST_MEASUREMENTS_FAILURE',
  payload: error,
});

export const postMeasurement = ({ name, units, dateProgress }) => dispatch => {
  const { token } = localStorage;
  dispatch(measurementsRequest());
  axios
    .post(
      '/measurements',
      {
        name,
        units,
        date_progress: dateProgress,

      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      { withCredentials: true },
    )
    .then(response => {
      const measurements = response.data;
      dispatch(postMeasurementsSuccess(measurements));
    })
    .catch(error => {
      // error.message is the error message
      dispatch(postMeasurementsFailure(error.message));
    });
};

export const getMeasurements = id => dispatch => {
  const { token } = localStorage;
  dispatch(measurementsRequest());
  axios
    .get(
      `/nutrients/${id}/measurements`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      { withCredentials: true },
    )
    .then(response => {
      const measurements = response.data;
      dispatch(getMeasurementsSuccess(measurements));
    })
    .catch(error => {
      // error.message is the error message
      dispatch(getMeasurementsFailure(error.message));
    });
};
