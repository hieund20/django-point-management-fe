const defaultState = {
  loading: false,
  data: [],
  errorMsg: "",
  count: 0,
};

export const userScoreReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_SCORES_LOADING":
      return {
        ...state,
        loading: true,
        errorMsg: "",
      };
    case "GET_SCORES_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        errorMsg: "",
        count: action.payload.count,
      };
    case "GET_SCORES_FAIL":
      return {
        ...state,
        loading: false,
        errorMsg: "Lỗi khi lấy danh sách điểm khóa học của người dùng",
      };
    default:
      return state;
  }
};
