const defaultState = {
  loading: false,
  data: [],
  errorMsg: "",
  count: 0,
};

export const postUserScoreReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "POST_USER_SCORE_LOADING":
      return {
        ...state,
        loading: true,
        errorMsg: "",
      };
    case "POST_USER_SCORE_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        errorMsg: "",
        count: action.payload.count,
      };
    case "POST_USER_SCORE_FAIL":
      return {
        ...state,
        loading: false,
        errorMsg: "Lỗi khi lưu điểm sinh viên",
      };
    default:
      return state;
  }
};
