import { SAVE_BUGS_LIST } from "../Constant/action-types";

export function saveBugsList(payload) {
  return { type: SAVE_BUGS_LIST, payload };
}
