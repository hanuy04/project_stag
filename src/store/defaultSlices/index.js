import { combineReducers } from "redux";
import { tesSlice } from "./tesSlice";

// yg normal disini, kasi isi
const defaultReducers = combineReducers({
  tes : tesSlice.reducer
});

// udahh

export default defaultReducers;
