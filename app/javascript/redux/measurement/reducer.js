
const initialState = {
  loading: false,
  measurement: {},
  error: '',
  message: '',
};

const measurementReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MEASUREMENT_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'GET_MEASUREMENT_SUCCESS':
      return {
        loading: false,
        measurement: action.payload,
        error: '',
      };
    case 'FAILURE_MEASUREMENT_REQUEST':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'POST_MEASUREMENT_SUCCESS':
    case 'EDIT_MEASUREMENT_SUCCESS':
    case 'DELETE_MEASUREMENT_SUCCESS':

      return {
        ...state,
        loading: false,
        message: action.payload,
      };


    default: return state;
  }
};

export default measurementReducer;
