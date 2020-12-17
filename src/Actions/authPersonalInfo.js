import { SAVE_PERSONAL_INFO } from "../Constant/action-types";

export function savePersonalInfo(payload) {
  return { type: SAVE_PERSONAL_INFO, payload };
}
