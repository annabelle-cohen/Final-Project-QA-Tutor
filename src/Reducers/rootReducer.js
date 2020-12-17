import authReducer from "./authReducer";
import authAAPReducer from "./authAAPReducer";
import personalInfoReducer from "./personalInfoReducer";
import { combineReducers } from "redux";
// in future will be shopCartReducer

const rootReducer = combineReducers({
  auth: authReducer,
  isLogin: false,
  authAAP: authAAPReducer,
  isLoginAAP: false,
  personalInfo: personalInfoReducer,
});

export default rootReducer;
