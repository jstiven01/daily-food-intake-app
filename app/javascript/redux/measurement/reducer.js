
const initialState = {
  loading: false,
  measurement: {},
  error: '',
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
      return {
        loading: false,
        measurement: action.payload,
        error: '',
      };

    default: return state;
  }
};

export default measurementReducer;
