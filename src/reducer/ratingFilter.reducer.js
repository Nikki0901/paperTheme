import { ratingFilterConstants } from "../action/constant";

const initState = {
  ratingFilterData: [],
  error: null,
};

export default (state = initState, action) => {
//   console.log("action", action.payload);

  switch (action.type) {
    case ratingFilterConstants.RATING_FILTER_SUCCESS:
      state = {
        ...state,
        ratingFilterData: action.payload.ratingFilter.result,
      };
      break;
    case ratingFilterConstants.RATING_FILTER_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
  }

  return state;
};
