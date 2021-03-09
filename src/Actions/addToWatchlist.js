import { ADD_TO_WATCHLIST } from "../Constant/action-types";

export function saveWatchlist(payload) {
  return { type: ADD_TO_WATCHLIST, payload };
}
