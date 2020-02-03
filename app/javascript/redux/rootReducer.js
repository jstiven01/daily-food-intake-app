import { combineReducers } from 'redux';

import authReducer from './auth/reducer';

const rootReducer = combineReducers({

  currentUser: authReducer,
});

export default rootReducer;
