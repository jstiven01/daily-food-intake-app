
const initialState = {
  loading: false,
  nutrients: [],
  error: '',
};

const nutrientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NUTRIENTS_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'GET_NUTRIENTS_SUCCESS':
      return {
        loading: false,
        nutrients: action.payload,
        error: '',
      };
    case 'GET_NUTRIENTS_FAILURE':
      return {
        loading: false,
        nutrients: [],
        error: action.payload,
      };

    case 'POST_NUTRIENTS_SUCCESS':
      return {
        loading: false,
        nutrients: [...state.nutrients, action.payload],
        error: '',
      };
    case 'POST_NUTRIENTS_FAILURE':
      return {
        loading: false,
        nutrients: [],
        error: action.payload,
      };

    default: return state;
  }
};

export default nutrientsReducer;
