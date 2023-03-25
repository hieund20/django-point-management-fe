const defaultState = {
  loading: false,
  data: null,
  errorMsg: "",
  count: 0,
};

export const forumPostListReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_FORUM_POST_LIST_LOADING":
      return {
        ...state,
        loading: true,
        errorMsg: "",
      };
    case "GET_FORUM_POST_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        errorMsg: "",
        count: action.payload.count,
      };
    case "GET_FORUM_POST_LIST_FAIL":
      return {
        ...state,
        loading: false,
        errorMsg: "Lỗi khi lấy danh sách bài đăng trên diễn đàn",
      };
    default:
      return state;
  }
};

export const forumPostDetailReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_FORUM_POST_DETAIL_LOADING":
      return {
        ...state,
        loading: true,
        errorMsg: "",
      };
    case "GET_FORUM_POST_DETAIL_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        errorMsg: "",
      };
    case "GET_FORUM_POST_DETAIL_FAIL":
      return {
        ...state,
        loading: false,
        errorMsg: "Lỗi khi lấy chi tiết bài đăng trên diễn đàn",
      };
    default:
      return state;
  }
};
