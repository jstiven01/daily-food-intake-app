import axios from 'axios';

export const measurementsRequest = () => ({
  type: 'MEASUREMENT_REQUEST',
});

export const getMeasurementSuccess = measurements => ({
  type: 'GET_MEASUREMENT_SUCCESS',
  payload: measurements,
});


export const postMeasurementSuccess = message => ({
  type: 'POST_MEASUREMENT_SUCCESS',
  payload: message,
});


export const editMeasurementSuccess = message => ({
  type: 'EDIT_MEASUREMENT_SUCCESS',
  payload: message,
});

export const deleteMeasurementSuccess = message => ({
  type: 'DELETE_MEASUREMENT_SUCCESS',
  payload: message,
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
      const measurement = response.data;
      dispatch(getMeasurementSuccess(measurement));
    })
    .catch(error => {
      dispatch(failureMeasurementRequest(error.message));
    });
};

export const postMeasurement = (nutrientId, amount, history) => dispatch => {
  const { token } = localStorage;
  dispatch(measurementsRequest());
  axios
    .post(
      `/nutrients/${nutrientId}/measurements`,
      {
        amount,
        date_intake: '',

      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      { withCredentials: true },
    )
    .then(response => {
      if (response.status === 201) {
        dispatch(postMeasurementSuccess('Measurement was created!!'));
        history.push(`/nutrient/${nutrientId}/measurements`);
      }
    })
    .catch(error => {
      dispatch(failureMeasurementRequest(error.message));
    });
};

export const editMeasurement = (nutrientId, measurementId, amount, history) => dispatch => {
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
        dispatch(editMeasurementSuccess('Measurement was edited !!'));
        history.push(`/nutrient/${nutrientId}/measurements`);
      }
    })
    .catch(error => {
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
        dispatch(deleteMeasurementSuccess('Measurement was deleted!!'));
        history.push(`/nutrient/${nutrientId}/measurements`);
      }
    })
    .catch(error => {
      dispatch(failureMeasurementRequest(error.message));
    });
};
