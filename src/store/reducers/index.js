import { combineReducers } from "redux";
import {
  courseListReducer,
  courseDetailReducer,
  courseMemberReducer,
} from "./courseReducer";
import { postUserScoreReducer } from "./scoreReducer";
import { loginUserReducer, registerUserReducer, userScoreReducer } from "./userReducer";

const RootReducer = combineReducers({
  courseList: courseListReducer,
  courseDetail: courseDetailReducer,
  courseMembers: courseMemberReducer,
  userScore: userScoreReducer,
  registerUser: registerUserReducer,
  loginUser: loginUserReducer,
  postUserScore: postUserScoreReducer,
});

export default RootReducer;
