import { combineReducers } from "redux";
import passportReducer from "./passportReducer";
import checkReducer from "./checkReducer";
import adReducer from "./adReducer";
import advertiserReducer from "./advertiserReducer";
import sellerReducer from "./sellerReducer";
import contractReducer from "./contractReducer";
import navbarReducer from "./navbarReducer";
import loginReducer from "./loginReducer";

export default combineReducers({
  loginReducer: loginReducer,
  navbarReducer: navbarReducer,
  adReducer: adReducer,
  contractReducer: contractReducer,
  advertiserReducer: advertiserReducer,
  sellerReducer: sellerReducer,
  checkReducer: checkReducer,
  passportReducer: passportReducer
});
