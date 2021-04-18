import { SAVE_MESSAGE } from "../Constant/action-types";

const iniState = {
  message: "Loading...",
};

const messageReducer = (state = iniState, action) => {
  if (action.type === SAVE_MESSAGE) {
    return Object.assign({}, state, action.payload);
  }
  return state;
};

export default messageReducer;
