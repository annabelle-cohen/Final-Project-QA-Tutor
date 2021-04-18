import { SAVE_MESSAGE } from "../Constant/action-types";

export function saveMessage(payload) {
  return { type: SAVE_MESSAGE, payload };
}
