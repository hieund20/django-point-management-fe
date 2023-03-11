import { combineReducers } from "redux";
import { courseListReducer, courseDetailReducer } from "./courseReducer";
import { userScoreReducer } from "./userReducer";

const RootReducer = combineReducers({
  courseList: courseListReducer,
  courseDetail: courseDetailReducer,
  userScore: userScoreReducer
});

export default RootReducer;
