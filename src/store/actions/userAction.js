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
          Authorization: `Bearer QfztThMGIyvuKlHn7RYXa96KvHrQ5L`,
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
          Authorization: `Bearer QfztThMGIyvuKlHn7RYXa96KvHrQ5L`,
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

export const registerUser = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "REGISTER_USER_LOADING",
    });

    const res = await axios.post(
      `https://django-point-management.herokuapp.com/user/`,
      {
        ...payload.body,
      },
      {
        headers: {
          Authorization: `Bearer sYKq4kOQmXDl3ogsHm2DTOQUwIaXWU`,
        },
      }
    );

    dispatch({
      type: "REGISTER_USER_SUCCESS",
      payload: res.data,
    });
    
    return res;
  } catch (e) {
    dispatch({
      type: "REGISTER_USER_FAIL",
    });
  }
};
