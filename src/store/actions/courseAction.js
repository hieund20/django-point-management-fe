import axios from "axios";

export const getCourseList = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "GET_COURSE_LIST_LOADING",
    });

    const outh2 = JSON.parse(localStorage.getItem("OAUTH2"));
    const { access_token, token_type } = outh2;
    const res = await axios.get(
      `https://django-point-management.herokuapp.com/course/`,
      {
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      }
    );

    dispatch({
      type: "GET_COURSE_LIST_SUCCESS",
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: "GET_COURSE_LIST_FAIL",
    });
  }
};

export const getCourseDetail = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "GET_COURSE_DETAIL_LOADING",
    });

    const outh2 = JSON.parse(localStorage.getItem("OAUTH2"));
    const { access_token, token_type } = outh2;
    const res = await axios.get(
      `https://django-point-management.herokuapp.com/course/${payload.id}/`,
      {
        headers: {
          Authorization: `${token_type} ${access_token}`,
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

export const getCourseMembers = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "GET_COURSE_MEMBER_LOADING",
    });

    const outh2 = JSON.parse(localStorage.getItem("OAUTH2"));
    const { access_token, token_type } = outh2;
    const res = await axios.get(
      `https://django-point-management.herokuapp.com/course/${payload.id}/get_member/`,
      {
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      }
    );

    dispatch({
      type: "GET_COURSE_MEMBER_SUCCESS",
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: "GET_COURSE_MEMBER_FAIL",
    });
  }
};
