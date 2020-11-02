import { ratingConstants } from "../action/constant";

const initState = {
  myRatingList: [],
  totalRating: "",
  error: null,
  loading:true
};

export default (state = initState, action) => {
  console.log("action", action.payload);

  switch (action.type) {
    case ratingConstants.RATING_LIST_REQUEST:
      state = {
        ...state,
        loading:true
      };
      break;
    case ratingConstants.RATING_LIST_SUCCESS:
      state = {
        ...state,
        myRatingList: action.payload.ratingList.result,
        totalRating: action.payload.ratingList.total_average_rating,
        loading:false
      };
      break;
    case ratingConstants.RATING_LIST_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
  }

  return state;
};
