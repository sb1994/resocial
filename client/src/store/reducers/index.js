import { combineReducers } from "redux";
import authUserReducer from "./authUserReducer";
import postReducer from "./postReducer";

export default combineReducers({
  auth: authUserReducer,
  post: postReducer,
});
