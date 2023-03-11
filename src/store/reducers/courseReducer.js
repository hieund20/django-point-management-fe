const defaultState = {
  loading: false,
  data: [],
  errorMsg: "",
  count: 0,
};

export const courseListReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_COURSE_LIST_LOADING":
      return {
        ...state,
        loading: true,
        errorMsg: "",
      };
    case "GET_COURSE_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        errorMsg: "",
        count: action.payload.count,
      };
    case "GET_COURSE_LIST_FAIL":
      return {
        ...state,
        loading: false,
        errorMsg: "Lỗi khi lấy danh sách khóa học",
      };
    default:
      return state;
  }
};

export const courseDetailReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_COURSE_DETAIL_LOADING":
      return {
        ...state,
        loading: true,
        errorMsg: "",
      };
    case "GET_COURSE_DETAIL_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        errorMsg: "",
      };
    case "GET_COURSE_DETAIL_FAIL":
      return {
        ...state,
        loading: false,
        errorMsg: "Lỗi khi lấy chi tiết khóa học",
      };
    default:
      return state;
  }
};
