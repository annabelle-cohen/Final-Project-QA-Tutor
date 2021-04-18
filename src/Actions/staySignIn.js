import { STAY_SIGN_IN } from "../Constant/action-types";

export function saveStaySignIn(payload) {
  return { type: STAY_SIGN_IN, payload };
}
