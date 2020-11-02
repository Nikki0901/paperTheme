import axios from "axios";
import { salesUserConstants } from "./constant";
import { baseUrl } from "../components/Service/Config";

const auth = JSON.parse(localStorage.getItem("authToken"));

export const getSalesUserList = () => {
  return async (dispatch) => {
    dispatch({ type: salesUserConstants.SALES_GET_REQUEST });
    const res = await axios.get(
        `${baseUrl}/bmw/sales_list/token/${auth}/id//offset/0/limit/10`
    );
    console.log("rating-res", res);

    if (res.data.code === 1) {
      dispatch({
        type: salesUserConstants.SALES_GET_SUCCESS,
        payload: { salesList: res.data },
      });
    } else {
      dispatch({
        type: salesUserConstants.SALES_GET_FAILURE,
        payload: { error: "response error" },
      });
    }
  };
};
