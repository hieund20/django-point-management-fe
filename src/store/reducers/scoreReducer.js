const defaultState = {
  loading: false,
  data: null,
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

export const putUserScoreReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "PUT_USER_SCORE_LOADING":
      return {
        ...state,
        loading: true,
        errorMsg: "",
      };
    case "PUT_USER_SCORE_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        errorMsg: "",
      };
    case "PUT_USER_SCORE_FAIL":
      return {
        ...state,
        loading: false,
        errorMsg: "Lỗi khi cập nhật điểm sinh viên",
      };
    default:
      return state;
  }
};

export const getScoreByUserAndCourseReducer = (
  state = defaultState,
  action
) => {
  switch (action.type) {
    case "GET_SCORE_BY_USER_COURSE_LOADING":
      return {
        ...state,
        loading: true,
        errorMsg: "",
      };
    case "GET_SCORE_BY_USER_COURSE_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        errorMsg: "",
      };
    case "GET_SCORE_BY_USER_COURSE_FAIL":
      return {
        ...state,
        loading: false,
        errorMsg: "Lỗi khi lưu điểm sinh viên",
      };
    case "PUT_LOCK_USER_SCORE_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        errorMsg: "",
      };
    case "PUT_UNLOCK_USER_SCORE_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        errorMsg: "",
      };
    default:
      return state;
  }
};
