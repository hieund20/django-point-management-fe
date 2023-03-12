import { combineReducers } from "redux";
import { courseListReducer, courseDetailReducer, courseMemberReducer } from "./courseReducer";
import { userScoreReducer } from "./userReducer";

const RootReducer = combineReducers({
  courseList: courseListReducer,
  courseDetail: courseDetailReducer,
  courseMembers: courseMemberReducer,
  userScore: userScoreReducer
});

export default RootReducer;
