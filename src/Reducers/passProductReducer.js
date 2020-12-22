import { SAVE_PASSING_PRODUCT } from "../Constant/action-types";

const iniState = {
  productToPass: "",
};

const productToPassReducer = (state = iniState, action) => {
  if (action.type === SAVE_PASSING_PRODUCT) {
    return Object.assign({}, state, action.payload);
  }
  return state;
};

export default productToPassReducer;
