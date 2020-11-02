import { salesUserConstants } from "../action/constant";

const initState = {
  mySalesUserList: [],
  count:null,
  error: null,
  offset: null,
  loading:true
};

export default (state = initState, action) => {
  console.log("action", action.payload);

  switch (action.type) {
    case salesUserConstants.SALES_GET_SUCCESS:
      state = {
        ...state,
        mySalesUserList: action.payload.salesList.result,
        count: action.payload.salesList.count,
        offset: action.payload.salesList.offset,
        loading:false
      };
      break;
    case salesUserConstants.SALES_GET_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
  }

  return state;
};
