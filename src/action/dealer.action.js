import axios from "axios";
import { dealerConstants } from "./constant";
import { baseUrl } from "../components/Service/Config";

const auth = JSON.parse(localStorage.getItem("authToken"));

// export const getDealershipList = () => {
//   console.log("getdealer");
//   return async (dispatch) => {
//     dispatch({ type: dealerConstants.DEALERLIST_REQUEST });
//     const res = await axios.get(
//       `${baseUrl}/dealership/list/offset/0/limit/10/token/${auth}`
//     );
//     // console.log("dealer-res", res);

//     if (res.data.code === 1) {
//       // console.log("dealershipList", res.data.result);
//       dispatch({
//         type: dealerConstants.DEALERLIST_SUCCESS,
//         payload: { dealershipList: res.data },
//       });
//     } else {
//       dispatch({
//         type: dealerConstants.DEALERLIST_FAILURE,
//         payload: { error: "response error" },
//       });
//     }
//   };
// };



export const getDealership =(json)=>{
  return{
      type:"SUBMIT",
      payload: {
        code: "code",
        dealershipList:json,
      },
  }
}


    // submit1: (json) => {
    //   dispatch({
    //     type: "SUBMIT",
    //     payload: {
    //       code: "code",
    //       dealershipList:json,
    //     },
    //   });
    // },