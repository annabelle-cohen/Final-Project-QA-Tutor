import { SAVE_PRODUCT_SELECETED } from "../Constant/action-types";

const iniState = {
  productSelected: "",
};

const productSelectedReducer = (state = iniState, action) => {
  if (action.type === SAVE_PRODUCT_SELECETED) {
    return Object.assign({}, state, action.payload);
  }
  return state;
};

export default productSelectedReducer;
