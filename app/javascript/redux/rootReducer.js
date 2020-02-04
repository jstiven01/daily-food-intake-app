import { combineReducers } from 'redux';

import authReducer from './auth/reducer';
import nutrientsReducer from './nutrients/reducer';
import measurementsReducer from './measurements/reducer';

const rootReducer = combineReducers({

  currentUser: authReducer,
  nutrients: nutrientsReducer,
  measurements: measurementsReducer,
});

export default rootReducer;
