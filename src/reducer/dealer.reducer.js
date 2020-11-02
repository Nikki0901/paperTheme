import { dealerConstants } from "../action/constant";

const initState = {
  myDealership: [],
  myCount: "",
  error: null,
};

export default (state = initState, action) => {
  // console.log("action", action.payload);

  // switch (action.type)
   { 
    if(action.type ==='SUBMIT'){
         state = {
        ...state,
        myDealership: action.payload.dealershipList.result,
        myCount: action.payload.dealershipList.count,
      };
  }
  
    // case dealerConstants.DEALERLIST_SUCCESS:
    //   state = {
    //     ...state,
    //     myDealership: action.payload.dealershipList.result,
    //     myCount: action.payload.dealershipList.count,
    //   };
    //   break;
    // case dealerConstants.DEALERLIST_FAILURE:
    //   state = {
    //     ...state,
    //     error: action.payload.error,
    //   };
    //   break;
  }

  return state;
};
