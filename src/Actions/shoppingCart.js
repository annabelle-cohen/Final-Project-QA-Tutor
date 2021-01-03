import { SAVE_SHOPPING_CART } from "../Constant/action-types";

export function saveCart(payload) {
  return { type: SAVE_SHOPPING_CART, payload };
}
