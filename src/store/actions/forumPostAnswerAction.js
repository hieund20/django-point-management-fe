import axios from "axios";

export const getForumPostAnswerListByForumPostID =
  (payload) => async (dispatch) => {
    try {
      dispatch({
        type: "GET_FORUM_POST_ANSWER_LIST_LOADING",
      });

      const outh2 = JSON.parse(localStorage.getItem("OAUTH2"));
      const { access_token, token_type } = outh2;
      const res = await axios.get(
        `https://django-point-management.herokuapp.com/forumPostAnswer/get_forum_post_answer_by_forum_post_id/?forum_post_id=${payload.forum_post_id}`,
        {
          headers: {
            Authorization: `${token_type} ${access_token}`,
          },
        }
      );

      dispatch({
        type: "GET_FORUM_POST_ANSWER_LIST_SUCCESS",
        payload: res.data,
      });
    } catch (e) {
      dispatch({
        type: "GET_FORUM_POST_ANSWER_LIST_FAIL",
      });
    }
  };

export const postForumAnswerPost = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: "POST_FORUM_ANSWER_POST_LOADING",
    });

    const outh2 = JSON.parse(localStorage.getItem("OAUTH2"));
    const { access_token, token_type } = outh2;
    const res = await axios.post(
      `https://django-point-management.herokuapp.com/forumPostAnswer/`,
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
      type: "POST_FORUM_ANSWER_POST_SUCCESS",
      payload: res.data,
    });

    return res;
  } catch (e) {
    dispatch({
      type: "POST_FORUM_ANSWER_POST_FAILs",
    });
  }
};
