import { SAVE_LAST_CHOICE } from "../Constant/action-types";

export function saveLastChoice(payload) {
  return { type: SAVE_LAST_CHOICE, payload };
}
