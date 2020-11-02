import dealerReducer from "./dealer.reducer";
import ratingReducer from "./rating.reducer";
import ratingFilterReducer from "./ratingFilter.reducer";
import salesUserReducer from "./sales.reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  dealership: dealerReducer,
  rating: ratingReducer,
  ratingFilter: ratingFilterReducer,
  salesUser: salesUserReducer,
});

export default rootReducer;
