import { ADD_TO_WATCHLIST } from "../Constant/action-types";

const iniState = {
  Watchlist: [],
};

const watchlistReducer = (state = iniState, action) => {
  if (action.type === ADD_TO_WATCHLIST) {
    return Object.assign({}, state, action.payload);
  }
  return state;
};

export default watchlistReducer;
