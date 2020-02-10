
const initialState = {
  loading: false,
  measurements: [],
  error: '',
};

const measurementsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MEASUREMENTS_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'GET_MEASUREMENTS_SUCCESS':
      return {
        loading: false,
        measurements: action.payload,
        error: '',
      };
    case 'FAILURE_MEASUREMENTS_REQUEST':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'POST_MEASUREMENTS_SUCCESS':
      return {
        loading: false,
        measurements: [...state.measurements, action.payload],
        error: '',
      };

    default: return state;
  }
};

export default measurementsReducer;
