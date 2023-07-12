const initialState = {
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  userId: localStorage.getItem("idUser"),
  isAuthenticated: localStorage.getItem("idUser") !== null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        userId: action.payload.userId,
        isAuthenticated: true,
        error: null,
      };
    case "LOGIN_FAILURE":
      return { ...state, error: action.payload };
    case "LOGOUT":
      return { ...state, ...initialState };
    case "REFRESH_TOKEN_SUCCESS":
      return { ...state, accessToken: action.payload, error: null };
    case "REFRESH_TOKEN_FAILURE":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default authReducer;
