
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
    case 'GET_MEASUREMENTS_FAILURE':
      return {
        loading: false,
        measurements: [],
        error: action.payload,
      };

    case 'POST_MEASUREMENTS_SUCCESS':
      return {
        loading: false,
        measurements: [...state.measurements, action.payload],
        error: '',
      };
    case 'POST_MEASUREMENTS_FAILURE':
      return {
        loading: false,
        measurements: [],
        error: action.payload,
      };

    default: return state;
  }
};

export default measurementsReducer;
