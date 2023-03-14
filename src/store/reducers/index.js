import { combineReducers } from "redux";
import {
  courseListReducer,
  courseDetailReducer,
  courseMemberReducer,
} from "./courseReducer";
import { postUserScoreReducer } from "./scoreReducer";
import {
  loginUserReducer,
  registerUserReducer,
  userDetailByIdReducer,
  userDetailReducer,
  userScoreReducer,
} from "./userReducer";

const RootReducer = combineReducers({
  courseList: courseListReducer,
  courseDetail: courseDetailReducer,
  courseMembers: courseMemberReducer,
  userScore: userScoreReducer,
  registerUser: registerUserReducer,
  loginUser: loginUserReducer,
  userDetail: userDetailReducer,
  userDetailById: userDetailByIdReducer,
  postUserScore: postUserScoreReducer,
});

export default RootReducer;
