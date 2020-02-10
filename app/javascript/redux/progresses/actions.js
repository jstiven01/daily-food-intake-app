import axios from 'axios';
import { DateTime } from 'luxon';

const preparingDataChart = nutrientArray => {
  const labelsDate = [];
  const axisYData = [];
  for (let i = 9; i > -1; i -= 1) {
    const today = new Date(DateTime.local());
    const scaleDate = today.setDate(today.getDate() - i);
    const todayWithHoursZero = today.setHours(0, 0, 0, 0);
    labelsDate.push(scaleDate);
    const findData = nutrientArray.filter(
      nutr => new Date(nutr.date_progress).setHours(0, 0, 0, 0) === todayWithHoursZero,
    );
    if (findData.length > 0) {
      axisYData.push(findData[0].total_date);
    } else {
      axisYData.push(0);
    }
  }
  return [labelsDate, axisYData];
};

const nutrientDataChart = (preparedData, name) => {
  const data = {
    name,
    labels: preparedData[0],
    datasets: [{
      label: 'grams consumption',
      data: preparedData[1],
      backgroundColor: [
        '#2F3B47',
        '#2F3B47',
        '#2F3B47',
        '#2F3B47',
        '#2F3B47',
        '#2F3B47',
        '#2F3B47',
        '#2F3B47',
        '#2F3B47',
        '#2F3B47',

      ],
      borderColor: [
        '#2F3B47',
        '#2F3B47',
        '#2F3B47',
        '#2F3B47',
        '#2F3B47',
        '#2F3B47',
        '#2F3B47',
        '#2F3B47',
        '#2F3B47',
        '#2F3B47',
      ],
      borderWidth: 1,
    }],
  };
  return data;
};

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
      const nutrientsArray = [];
      for (let index = 0; index < Object.keys(progresses).length; index += 1) {
        const dataChart = preparingDataChart(progresses[Object.keys(progresses)[index]]);
        nutrientsArray.push(nutrientDataChart(dataChart, Object.keys(progresses)[index]));
      }
      dispatch(getProgressesSuccess(nutrientsArray));
    })
    .catch(error => {
      dispatch(failureProgressRequest(error.message));
    });
};
