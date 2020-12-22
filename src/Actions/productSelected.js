import { SAVE_PRODUCT_SELECETED } from "../Constant/action-types";

export function saveProductSelected(payload) {
  return { type: SAVE_PRODUCT_SELECETED, payload };
}
