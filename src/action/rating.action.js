import axios from "axios";
import { ratingConstants } from "./constant";
import { baseUrl } from "../components/Service/Config";

const auth = JSON.parse(localStorage.getItem("authToken"));

export const getRatingList = () => {
  return async (dispatch) => {
    dispatch({ type: ratingConstants.RATING_LIST_REQUEST });
    const res = await axios.get(
      `${baseUrl}/content/get/rating_list/roomid//token/${auth}`
    );
    console.log("rating-res", res);

    if (res.data.code === 1) {
      dispatch({
        type: ratingConstants.RATING_LIST_SUCCESS,
        payload: { ratingList: res.data },
      });
    } else {
      dispatch({
        type: ratingConstants.RATING_LIST_FAILURE,
        payload: { error: "response error" },
      });
    }
  };
};
