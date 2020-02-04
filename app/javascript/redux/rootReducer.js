import { combineReducers } from 'redux';

import authReducer from './auth/reducer';
import nutrientsReducer from './nutrients/reducer';

const rootReducer = combineReducers({

  currentUser: authReducer,
  nutrients: nutrientsReducer,
});

export default rootReducer;
