import { SAVE_ALL_CATEGORIES } from "../Constant/action-types";

export function saveAllCategories(payload) {
  return { type: SAVE_ALL_CATEGORIES, payload };
}
