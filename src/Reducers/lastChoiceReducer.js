import { SAVE_LAST_CHOICE } from "../Constant/action-types";

const iniState = {
  choice: "",
};

const lastChoiceReducer = (state = iniState, action) => {
  if (action.type === SAVE_LAST_CHOICE) {
    return Object.assign({}, state, action.payload);
  }
  return state;
};

export default lastChoiceReducer;
