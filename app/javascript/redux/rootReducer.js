import { combineReducers } from 'redux';

import authReducer from './auth/reducer';
import nutrientsReducer from './nutrients/reducer';
import measurementsReducer from './measurements/reducer';
import measurementReducer from './measurement/reducer';
import progressesReducer from './progresses/reducer'

const rootReducer = combineReducers({

  currentUser: authReducer,
  nutrients: nutrientsReducer,
  measurements: measurementsReducer,
  measurement: measurementReducer,
  progresses: progressesReducer,
});

export default rootReducer;
