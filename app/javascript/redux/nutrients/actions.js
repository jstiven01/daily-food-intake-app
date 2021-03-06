import axios from 'axios';

export const nutrientsRequest = () => ({
  type: 'NUTRIENTS_REQUEST',
});

export const getNutrientsSuccess = nutrients => ({
  type: 'GET_NUTRIENTS_SUCCESS',
  payload: nutrients,
});

export const getNutrientsFailure = error => ({
  type: 'GET_NUTRIENTS_FAILURE',
  payload: error,
});

export const postNutrientsSuccess = nutrients => ({
  type: 'POST_NUTRIENTS_SUCCESS',
  payload: nutrients,
});

export const postNutrientsFailure = error => ({
  type: 'POST_NUTRIENTS_FAILURE',
  payload: error,
});

export const postNutrient = ({
  name, units, dateProgress, totalNutrient,
}) => dispatch => {
  const { token } = localStorage;
  dispatch(nutrientsRequest());
  axios
    .post(
      '/nutrients',
      {
        name,
        units,
        date_progress: dateProgress,
        total_nutrient: totalNutrient,

      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      { withCredentials: true },
    )
    .then(response => {
      const nutrients = response.data;
      dispatch(postNutrientsSuccess(nutrients));
    })
    .catch(error => {
      // error.message is the error message
      dispatch(postNutrientsFailure(error.message));
    });
};

export const getNutrients = () => dispatch => {
  const { token } = localStorage;
  dispatch(nutrientsRequest());
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
      const nutrients = response.data;
      if (nutrients.length === 0) {
        dispatch(getNutrientsSuccess(nutrients));
        const protein = {
          name: 'Protein', units: 'grams', dateProgress: new Date(), totalNutrient: 0,
        };
        const carbs = {
          name: 'Carbs', units: 'grams', dateProgress: new Date(), totalNutrient: 0,
        };
        const fat = {
          name: 'Fat', units: 'grams', dateProgress: new Date(), totalNutrient: 0,
        };
        dispatch(postNutrient(protein));
        dispatch(postNutrient(fat));
        dispatch(postNutrient(carbs));
      } else {
        dispatch(getNutrientsSuccess(nutrients));
      }
    })
    .catch(error => {
      // error.message is the error message
      dispatch(getNutrientsFailure(error.message));
    });
};
