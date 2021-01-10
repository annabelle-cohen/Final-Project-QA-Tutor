import { SAVE_SHOPPING_CART } from "../Constant/action-types";

const initState = {
  cartId: "",
  lastPosition: 0,
  totalPrice: 0,
  totalNumOfProducts: 0,
  cart: [],
  amountOfproducts: [],
};

const cartReducer = (state = initState, action) => {
  if (action.type === SAVE_SHOPPING_CART) {
    return Object.assign({}, state, action.payload);
  }
  return state;
};

export default cartReducer;
