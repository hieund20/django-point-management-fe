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

    const { body } = payload;
    console.log("body", body);

    const formData = new FormData();
    formData.append("first_name", body.first_name);
    formData.append("last_name", body.last_name);
    formData.append("email", body.email);
    formData.append("username", body.username);
    formData.append("password", body.password);
    formData.append("avatar", body.avatar[0]);

    body.courses.forEach((el) => {
      formData.append("courses", el);
    });

    const res = await axios.post(
      `https://django-point-management.herokuapp.com/user/`,
      formData
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
      type: "GET_USER_DETAIL_FAIL",
    });
  }
};

export const getUserDetailById = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "GET_USER_DETAIL_BY_ID_LOADING",
    });

    const outh2 = JSON.parse(localStorage.getItem("OAUTH2"));
    const { access_token, token_type } = outh2;
    const res = await axios.get(
      `https://django-point-management.herokuapp.com/user/${payload.id}/`,
      {
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      }
    );

    dispatch({
      type: "GET_USER_DETAIL_BY_ID_SUCCESS",
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: "GET_USER_DETAIL_BY_ID_FAIL",
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

export const getUserListByName = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "GET_USER_LIST_BY_NAME_LOADING",
    });

    const outh2 = JSON.parse(localStorage.getItem("OAUTH2"));
    const { access_token, token_type } = outh2;
    const res = await axios.get(
      `https://django-point-management.herokuapp.com/user/get_user_by_name/?course_id=${payload.course_id}&first_name=${payload.first_name}&last_name=${payload.last_name}`,
      {
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      }
    );

    dispatch({
      type: "GET_USER_LIST_BY_NAME_SUCCESS",
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: "GET_USER_LIST_BY_NAME_FAIL",
    });
  }
};
