import authReducer from "./authReducer";
import authAAPReducer from "./authAAPReducer";
import { combineReducers } from "redux";
// in future will be shopCartReducer

const rootReducer = combineReducers({
  auth: authReducer,
  isLogin: false,
  authAAP: authAAPReducer,
  isLoginAAP: false,
});

export default rootReducer;
