import axios from "axios";

export const getScoresByCourse = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "GET_SCORES_LOADING",
    });

    const res = await axios.get(
      `https://django-point-management.herokuapp.com/user/get_scores_of_course/?course_id=${payload.id}`,
      {
        headers: {
          Authorization: `Bearer SGVRj1WUdn8t2BjMKQ61qWOEc08vjo`,
        },
      }
    );

    dispatch({
      type: "GET_SCORES_SUCCESS",
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: "GET_SCORES_FAIL",
    });
  }
};

export const getCourseDetail = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "GET_COURSE_DETAIL_LOADING",
    });

    const res = await axios.get(
      `https://django-point-management.herokuapp.com/course/${payload.id}/`,
      {
        headers: {
          Authorization: `Bearer SGVRj1WUdn8t2BjMKQ61qWOEc08vjo`,
        },
      }
    );

    dispatch({
      type: "GET_COURSE_DETAIL_SUCCESS",
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: "GET_COURSE_DETAIL_FAIL",
    });
  }
};
