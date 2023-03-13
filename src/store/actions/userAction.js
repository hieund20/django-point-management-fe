import axios from "axios";

export const getScoresByCourse = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "GET_SCORES_LOADING",
    });

    const outh2 = JSON.parse(localStorage.getItem("OAUTH2"));
    const { access_token, token_type } = outh2;
    const res = await axios.get(
      `https://django-point-management.herokuapp.com/user/get_scores_of_course/?course_id=${payload.id}`,
      {
        headers: {
          Authorization: `${token_type} ${access_token}`,
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

export const registerUser = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "REGISTER_USER_LOADING",
    });

    const outh2 = JSON.parse(localStorage.getItem("OAUTH2"));
    const { access_token, token_type } = outh2;
    const res = await axios.post(
      `https://django-point-management.herokuapp.com/user/`,
      {
        ...payload.body,
      },
      {
        headers: {
          Authorization: `${token_type} ${access_token}`,
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

export const loginUser = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "LOGIN_USER_LOADING",
    });

    const res = await axios.post(
      `https://django-point-management.herokuapp.com/o/token/`,
      {
        ...payload.body,
      }
    );

    dispatch({
      type: "LOGIN_USER_SUCCESS",
      payload: res.data,
    });

    return res;
  } catch (e) {
    dispatch({
      type: "LOGIN_USER_FAIL",
    });
  }
};

export const getUserDetail = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "GET_USER_DETAIL_LOADING",
    });

    const res = await axios.get(
      `https://django-point-management.herokuapp.com/user/get_current_user/`,
      {
        headers: {
          Authorization: `${payload.token_type} ${payload.access_token}`,
        },
      }
    );

    dispatch({
      type: "GET_USER_DETAIL_SUCCESS",
      payload: res.data,
    });
    return res;
  } catch (e) {
    dispatch({
      type: "GET_USER_DETAIL_FAILE",
    });
  }
};

export const logoutUser = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "LOGOUT_SUCCESS",
    });
    
  } catch (e) {
    dispatch({
      type: "LOGOUT_FAIL",
    });
  }
};
