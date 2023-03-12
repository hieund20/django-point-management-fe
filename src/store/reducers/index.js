import { combineReducers } from "redux";
import {
  courseListReducer,
  courseDetailReducer,
  courseMemberReducer,
} from "./courseReducer";
import { postUserScoreReducer } from "./scoreReducer";
import { registerUserReducer, userScoreReducer } from "./userReducer";

const RootReducer = combineReducers({
  courseList: courseListReducer,
  courseDetail: courseDetailReducer,
  courseMembers: courseMemberReducer,
  userScore: userScoreReducer,
  registerUser: registerUserReducer,
  postUserScore: postUserScoreReducer,
});

export default RootReducer;
