import axios from "axios";
import { ratingFilterConstants } from "./constant";
import { baseUrl } from "../components/Service/Config";

const auth = JSON.parse(localStorage.getItem("authToken"));

export const getRatingFilter = (key) => {
  return async (dispatch) => {
    dispatch({ type: ratingFilterConstants.RATING_FILTER_REQUEST });
    const res = await axios.get(
      `${baseUrl}/content/get/rating_list/roomid/${key}/token/${auth}`
    );
    // console.log("ratingfILTER-res", res);

    if (res.data.code === 1) {
      // console.log("dealershipList", res.data.result);
      dispatch({
        type: ratingFilterConstants.RATING_FILTER_SUCCESS,
        payload: { ratingFilter: res.data },
      });
    } else {
      dispatch({
        type: ratingFilterConstants.RATING_FILTER_FAILURE,
        payload: { error: "response error" },
      });
    }
  };
};
