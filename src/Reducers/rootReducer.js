import authReducer from "./authReducer";
import authAAPReducer from "./authAAPReducer";
import personalInfoReducer from "./personalInfoReducer";
import allCategoriesReducer from "./allCategoriesReducer";
import productByCategoryIDReducer from "./productsByCategoryIdReducer";
import productSelectedReducer from "./productSelectedReducer";
import productToPassReducer from "./passProductReducer";
import cartReducer from "./shoppingCartReducer";
import watchlistReducer from "./addToWatchlistReducer";
import savingCartId from "./cartIDReducer";
import { combineReducers } from "redux";
// in future will be shopCartReducer

const rootReducer = combineReducers({
  auth: authReducer,
  isLogin: false,
  authAAP: authAAPReducer,
  isLoginAAP: false,
  personalInfo: personalInfoReducer,
  categories: allCategoriesReducer,
  productsByCategory: productByCategoryIDReducer,
  productSelected: productSelectedReducer,
  productToPass: productToPassReducer,
  cart: cartReducer,
  watchlist: watchlistReducer,
  cartId: savingCartId,
});

export default rootReducer;
