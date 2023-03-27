import { combineReducers } from "redux";
import {
  courseListReducer,
  courseDetailReducer,
  courseMemberReducer,
} from "./courseReducer";
import { forumPostAnswerListReducer } from "./forumPostAnswerReducer";
import {
  forumPostDetailReducer,
  forumPostListReducer,
} from "./forumPostReducer";
import {
  getScoreByUserAndCourseReducer,
  postUserScoreReducer,
  putUserScoreReducer,
} from "./scoreReducer";
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
  putUserScore: putUserScoreReducer,
  scoreByUserAndCourse: getScoreByUserAndCourseReducer,
  forumPostList: forumPostListReducer,
  forumPostDetail: forumPostDetailReducer,
  forumPostAnswerList: forumPostAnswerListReducer,
});

export default RootReducer;
