import { SAVE_ADDING_PRODUCTS_CART } from "../Constant/action-types";

export function saveShoppingCart(payload) {
  return { type: SAVE_ADDING_PRODUCTS_CART, payload };
}
