import axios from "axios";

export const postUserScore = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "POST_USER_SCORE_LOADING",
    });

    const res = await axios.post(
      `https://django-point-management.herokuapp.com/score/`,
      { ...payload.body },
      {
        headers: {
          Authorization: `Bearer QfztThMGIyvuKlHn7RYXa96KvHrQ5L`,
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
