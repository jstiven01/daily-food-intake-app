
const initialState = {
  loading: false,
  progresses: {},
  error: '',
};

const progressesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PROGRESSES_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'GET_PROGRESSES_SUCCESS':
      return {
        loading: false,
        progresses: action.payload,
        error: '',
      };
    case 'FAILURE_PROGRESSES_REQUEST':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default: return state;
  }
};

export default progressesReducer;
