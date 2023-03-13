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

export const registerUserReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "REGISTER_USER_LOADING":
      return {
        ...state,
        loading: true,
        errorMsg: "",
      };
    case "REGISTER_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        errorMsg: "",
      };
    case "REGISTER_USER_FAIL":
      return {
        ...state,
        loading: false,
        errorMsg: "Lỗi đăng ký tài khoản người dùng",
      };
    default:
      return state;
  }
};

export const loginUserReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "LOGIN_USER_LOADING":
      return {
        ...state,
        loading: true,
        errorMsg: "",
      };
    case "LOGIN_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        errorMsg: "",
      };
    case "LOGIN_USER_FAIL":
      return {
        ...state,
        loading: false,
        errorMsg: "Lỗi đăng nhập",
      };
    default:
      return state;
  }
};

export const userDetailReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_USER_DETAIL_LOADING":
      return {
        ...state,
        loading: true,
        errorMsg: "",
      };
    case "GET_USER_DETAIL_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
        errorMsg: "",
      };
    case "GET_USER_DETAIL_FAIL":
      return {
        ...state,
        loading: false,
        errorMsg: "Lỗi khi lấy thông tin người dùng",
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        data: null,
      };
    default:
      return state;
  }
};
