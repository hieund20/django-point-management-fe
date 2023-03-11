import { combineReducers } from "redux";
import { courseReducer } from "./courseReducer";

const RootReducer = combineReducers({
  courseList: courseReducer,
});

export default RootReducer;
