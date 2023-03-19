import axios from "axios";

export const postUserScore = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "POST_USER_SCORE_LOADING",
    });

    const outh2 = JSON.parse(localStorage.getItem("OAUTH2"));
    const { access_token, token_type } = outh2;
    const res = await axios.post(
      `https://django-point-management.herokuapp.com/score/`,
      { ...payload.body },
      {
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      }
    );

    dispatch({
      type: "POST_USER_SCORE_SUCCESS",
      payload: res.data,
    });
    return res;
  } catch (e) {
    dispatch({
      type: "POST_USER_SCORE_FAIL",
    });
  }
};

export const getScoreByUserAndCourse = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "GET_SCORE_BY_USER_COURSE_LOADING",
    });

    const outh2 = JSON.parse(localStorage.getItem("OAUTH2"));
    const { access_token, token_type } = outh2;
    const res = await axios.get(
      `https://django-point-management.herokuapp.com/score/get_score_by_user_and_course/?user_id=${payload.user_id}&course_id=${payload.course_id}`,
      {
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      }
    );

    dispatch({
      type: "GET_SCORE_BY_USER_COURSE_SUCCESS",
      payload: res.data,
    });
    return res;
  } catch (e) {
    dispatch({
      type: "GET_SCORE_BY_USER_COURSE_FAIL",
    });
  }
};

export const putUserScore = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "PUT_USER_SCORE_LOADING",
    });

    const outh2 = JSON.parse(localStorage.getItem("OAUTH2"));
    const { access_token, token_type } = outh2;
    const res = await axios.put(
      `https://django-point-management.herokuapp.com/score/${payload.id}/`,
      { ...payload.body },
      {
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      }
    );

    dispatch({
      type: "PUT_USER_SCORE_SUCCESS",
      payload: res.data,
    });
    return res;
  } catch (e) {
    dispatch({
      type: "PUT_USER_SCORE_FAIL",
    });
  }
};

export const putLockUserScore = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "PUT_LOCK_USER_SCORE_LOADING",
    });

    const outh2 = JSON.parse(localStorage.getItem("OAUTH2"));
    const { access_token, token_type } = outh2;
    const res = await axios.put(
      `https://django-point-management.herokuapp.com/score/${payload.id}/lock_score/?user_send_email_id=${payload.user_send_email_id}`,
      { ...payload.body },
      {
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      }
    );

    dispatch({
      type: "PUT_LOCK_USER_SCORE_SUCCESS",
      payload: res.data,
    });
    return res;
  } catch (e) {
    dispatch({
      type: "PUT_LOCK_USER_SCORE_FAIL",
    });
  }
};

export const putUnLockUserScore = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "PUT_UNLOCK_USER_SCORE_LOADING",
    });

    const outh2 = JSON.parse(localStorage.getItem("OAUTH2"));
    const { access_token, token_type } = outh2;
    const res = await axios.put(
      `https://django-point-management.herokuapp.com/score/${payload.id}/unlock_score/?user_send_email_id=${payload.user_send_email_id}`,
      { ...payload.body },
      {
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      }
    );

    dispatch({
      type: "PUT_UNLOCK_USER_SCORE_SUCCESS",
      payload: res.data,
    });
    return res;
  } catch (e) {
    dispatch({
      type: "PUT_UNLOCK_USER_SCORE_FAIL",
    });
  }
};

export const postImportScoreCSV = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "POST_IMPORT_SCORE_CSV_LOADING",
    });

    const outh2 = JSON.parse(localStorage.getItem("OAUTH2"));
    const { access_token, token_type } = outh2;

    const { body, course_id } = payload;

    const res = await axios.post(
      `https://django-point-management.herokuapp.com/csv-handle/score/?course_id=${course_id}`,
      { ...payload.body },
      {
        headers: {
          Authorization: `${token_type} ${access_token}`,
          "Content-Disposition": `attachment; filename=${body.file.name}`,
        },
      }
    );

    dispatch({
      type: "POST_IMPORT_SCORE_CSV_SUCCESS",
      payload: res.data,
    });
    return res;
  } catch (e) {
    dispatch({
      type: "POST_IMPORT_SCORE_CSV_FAIL",
    });
  }
};

export const getScoreCSV = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "GET_SCORE_CSV_LOADING",
    });

    const outh2 = JSON.parse(localStorage.getItem("OAUTH2"));
    const { access_token, token_type } = outh2;

    const { course_id } = payload;

    const res = await axios.gét(
      `https://django-point-management.herokuapp.com/csv-handle/score/?course_id=${course_id}`,
      { ...payload.body },
      {
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      }
    );

    dispatch({
      type: "GET_SCORE_CSV_SUCCESS",
      payload: res.data,
    });
    return res;
  } catch (e) {
    dispatch({
      type: "GET_SCORE_CSV_FAIL",
    });
  }
};

export const getScorePDF = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "GET_SCORE_PDF_LOADING",
    });

    const outh2 = JSON.parse(localStorage.getItem("OAUTH2"));
    const { access_token, token_type } = outh2;

    const { course_id } = payload;

    const res = await axios.gét(
      `https://django-point-management.herokuapp.com/pdf-handle/score/?course_id=${course_id}`,
      { ...payload.body },
      {
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      }
    );

    dispatch({
      type: "GET_SCORE_PDF_SUCCESS",
      payload: res.data,
    });
    return res;
  } catch (e) {
    dispatch({
      type: "GET_SCORE_PDF_FAIL",
    });
  }
};
