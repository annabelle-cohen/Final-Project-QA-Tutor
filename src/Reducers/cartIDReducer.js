import { SAVE_CART_ID } from "../Constant/action-types";

const iniState = {
  id: 0,
};

const savingCartId = (state = iniState, action) => {
  if (action.type === SAVE_CART_ID) {
    return Object.assign({}, state, action.payload);
  }
  return state;
};

export default savingCartId;
