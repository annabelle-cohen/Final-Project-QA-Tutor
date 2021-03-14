import { SAVE_CART_ID } from "../Constant/action-types";

export function saveCartID(payload) {
  return { type: SAVE_CART_ID, payload };
}
