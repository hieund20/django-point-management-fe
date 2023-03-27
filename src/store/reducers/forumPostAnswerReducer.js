const defaultState = {
  loading: false,
  data: null,
  errorMsg: "",
  count: 0,
};

export const forumPostAnswerListReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_FORUM_POST_ANSWER_LIST_LOADING":
      return {
        ...state,
        loading: true,
        errorMsg: "",
      };
    case "GET_FORUM_POST_ANSWER_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        errorMsg: "",
        count: action.payload.count,
      };
    case "GET_FORUM_POST_ANSWER_LIST_FAIL":
      return {
        ...state,
        loading: false,
        errorMsg: "Lỗi khi lấy danh sách câu trả lời của bài đăng",
      };
    default:
      return state;
  }
};
