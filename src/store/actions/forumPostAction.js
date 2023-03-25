import axios from "axios";

export const getForumPostListByCourseID = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "GET_FORUM_POST_LIST_LOADING",
    });

    const outh2 = JSON.parse(localStorage.getItem("OAUTH2"));
    const { access_token, token_type } = outh2;
    const res = await axios.get(
      `https://django-point-management.herokuapp.com/forumPost/?course_id=${payload.course_id}`,
      {
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      }
    );

    dispatch({
      type: "GET_FORUM_POST_LIST_SUCCESS",
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: "GET_FORUM_POST_LIST_FAIL",
    });
  }
};

export const getForumPostDetail = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "GET_FORUM_POST_DETAIL_LOADING",
    });

    const outh2 = JSON.parse(localStorage.getItem("OAUTH2"));
    const { access_token, token_type } = outh2;
    const res = await axios.get(
      `https://django-point-management.herokuapp.com/forumPost/${payload.id}/`,
      {
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      }
    );

    dispatch({
      type: "GET_FORUM_POST_DETAIL_SUCCESS",
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: "GET_FORUM_POST_DETAIL_FAIL",
    });
  }
};

export const postForumPost = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "POST_FORUM_POST_LOADING",
    });

    const outh2 = JSON.parse(localStorage.getItem("OAUTH2"));
    const { access_token, token_type } = outh2;
    const res = await axios.post(
      `https://django-point-management.herokuapp.com/forumPost/`,
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
      type: "POST_FORUM_POST_SUCCESS",
      payload: res.data,
    });

    return res;
  } catch (e) {
    dispatch({
      type: "POST_FORUM_POST_FAIL",
    });
  }
};
