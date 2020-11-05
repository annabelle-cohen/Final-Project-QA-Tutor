import authReducer from './authReducer'
import { combineReducers } from 'redux'
// in future will be shopCartReducer

const rootReducer = combineReducers({
  auth: authReducer
});

export default rootReducer
