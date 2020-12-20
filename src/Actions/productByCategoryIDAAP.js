import { SAVE_PRODUCTS_BY_CATEGORY_ID } from "../Constant/action-types";

export function saveProductsByCategoryID(payload) {
  return { type: SAVE_PRODUCTS_BY_CATEGORY_ID, payload };
}
