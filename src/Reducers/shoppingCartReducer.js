import { SAVE_ADDING_PRODUCTS_CART } from "../Constant/action-types";

const iniState = {
  totalNumberOfProduct: 0,
  products: [],
  cartList: [],
  totalPrice: 0,
  lastPosition: 0,
};

const shoppingCartReducer = (state = iniState, action) => {
  if (action.type === SAVE_ADDING_PRODUCTS_CART) {
    return Object.assign({}, state, action.payload);
  }
  return state;
};

export default shoppingCartReducer;
