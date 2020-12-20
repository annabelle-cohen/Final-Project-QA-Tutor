import { SAVE_PRODUCTS_BY_CATEGORY_ID } from "../Constant/action-types";

const iniState = {
  categoryID: "",
  productsById: [],
};

const productByCategoryIDReducer = (state = iniState, action) => {
  if (action.type === SAVE_PRODUCTS_BY_CATEGORY_ID) {
    return Object.assign({}, state, action.payload);
  }
  return state;
};

export default productByCategoryIDReducer;
