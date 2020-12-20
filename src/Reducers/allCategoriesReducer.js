import { SAVE_ALL_CATEGORIES } from "../Constant/action-types";

const iniState = {
  categories: [],
};

const allCategoriesReducer = (state = iniState, action) => {
  if (action.type === SAVE_ALL_CATEGORIES) {
    return Object.assign({}, state, action.payload);
  }
  return state;
};

export default allCategoriesReducer;
