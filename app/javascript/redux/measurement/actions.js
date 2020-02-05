import axios from 'axios';

export const measurementsRequest = () => ({
  type: 'MEASUREMENT_REQUEST',
});

export const getMeasurementSuccess = measurements => ({
  type: 'GET_MEASUREMENT_SUCCESS',
  payload: measurements,
});


export const postMeasurementSuccess = measurements => ({
  type: 'POST_MEASUREMENT_SUCCESS',
  payload: measurements,
});


export const editMeasurementSuccess = () => ({
  type: 'EDIT_MEASUREMENT_SUCCESS',
});

export const deleteMeasurementSuccess = () => ({
  type: 'DELETE_MEASUREMENT_SUCCESS',
});

export const failureMeasurementRequest = error => ({
  type: 'FAILURE_MEASUREMENT_REQUEST',
  payload: error,
});

export const getMeasurement = (nutrientId, measurementId) => dispatch => {
  const { token } = localStorage;
  dispatch(measurementsRequest());
  axios
    .get(
      `/nutrients/${nutrientId}/measurements/${measurementId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      { withCredentials: true },
    )
    .then(response => {
      console.log('GET: ', response);
      const measurement = response.data;
      dispatch(getMeasurementSuccess(measurement));
    })
    .catch(error => {
      // error.message is the error message
      dispatch(failureMeasurementRequest(error.message));
    });
};

export const postMeasurement = (nutrientId, { amount, dateIntake }) => dispatch => {
  const { token } = localStorage;
  dispatch(measurementsRequest());
  axios
    .post(
      `/nutrients/${nutrientId}/measurements`,
      {
        amount,
        date_intake: dateIntake,

      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      { withCredentials: true },
    )
    .then(response => {
      console.log('POST: ', response);
      const measurement = response.data;
      dispatch(postMeasurementSuccess(measurement));
    })
    .catch(error => {
      // error.message is the error message
      dispatch(failureMeasurementRequest(error.message));
    });
};

export const editMeasurement = (nutrientId, measurementId, amount) => dispatch => {
  const { token } = localStorage;
  dispatch(measurementsRequest());
  axios
    .put(
      `/nutrients/${nutrientId}/measurements/${measurementId}`,
      {
        amount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      { withCredentials: true },
    )
    .then(response => {
      if (response.status === 204) {
        dispatch(editMeasurementSuccess());
      }
    })
    .catch(error => {
    // error.message is the error message
      dispatch(failureMeasurementRequest(error.message));
    });
};

export const deleteMeasurement = (nutrientId, measurementId, history) => dispatch => {
  const { token } = localStorage;
  dispatch(measurementsRequest());
  axios
    .delete(
      `/nutrients/${nutrientId}/measurements/${measurementId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      { withCredentials: true },
    )
    .then(response => {
      if (response.status === 204) {
        dispatch(deleteMeasurementSuccess());
        history.push(`/nutrient/${nutrientId}/measurements`);
      }
    })
    .catch(error => {
    // error.message is the error message
      dispatch(failureMeasurementRequest(error.message));
    });
};
