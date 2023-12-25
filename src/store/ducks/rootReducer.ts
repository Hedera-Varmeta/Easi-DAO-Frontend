import { combineReducers } from "@reduxjs/toolkit";
import example from "./example/slice";
import auth from "./auth/slice";
import proposal from "./proposal/slice";

const createRootReducer = () => {
  return combineReducers({
    example,
    auth,
    proposal,
  });
};

export default createRootReducer;
