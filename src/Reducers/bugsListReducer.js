import { SAVE_BUGS_LIST } from "../Constant/action-types";

const iniState = {
  bugsList: [],
};
//fpor user!!

const bugsListReducer = (state = iniState, action) => {
  if (action.type === SAVE_BUGS_LIST) {
    return Object.assign({}, state, action.payload);
  }
  return state;
};

export default bugsListReducer;
