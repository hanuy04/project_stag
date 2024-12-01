import { persistReducer } from "redux-persist";
import { authSlice } from "./authSlice";
import { combineReducers } from "redux";
import storageEngine from "../config/storageEngine";
// import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: storageEngine,
}

// nambah yg persist disini
const rootReducer = combineReducers({
  auth: authSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
