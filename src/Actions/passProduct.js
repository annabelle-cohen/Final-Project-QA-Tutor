import { SAVE_PASSING_PRODUCT } from "../Constant/action-types";

export function savePassingProduct(payload) {
  return { type: SAVE_PASSING_PRODUCT, payload };
}
