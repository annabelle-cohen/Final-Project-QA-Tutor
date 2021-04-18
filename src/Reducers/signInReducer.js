import { STAY_SIGN_IN } from "../Constant/action-types";

const iniState = {
  isStaySignIn: false,
};

const staySignedReducer = (state = iniState, action) => {
  if (action.type === STAY_SIGN_IN) {
    return Object.assign({}, state, action.payload);
  }
  return state;
};

export default staySignedReducer;
