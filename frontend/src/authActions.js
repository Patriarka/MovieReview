import api from "./api";

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await api.post("/api/token/", credentials);

      if (response.status !== 200) {
        throw new Error("Login failed");
      }

      const {
        refresh: refreshToken,
        access: accessToken,
        id: userId,
      } = response.data;

      localStorage.setItem("refreshTokenUser", JSON.stringify(refreshToken));
      localStorage.setItem("tokenUser", JSON.stringify(accessToken));
      localStorage.setItem("idUser", JSON.stringify(userId));

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { accessToken, refreshToken, userId },
      });

      return { response, error: null };
    } catch (error) {
      return { response: null, error: error.message };
    }
  };
};

export const logout = (body) => {
  api.post("/logout/", body);

  localStorage.setItem("refreshTokenUser", "");
  localStorage.setItem("tokenUser", "");
  localStorage.setItem("idUser", "");

  return { type: "LOGOUT" };
};

// export const refreshToken = (refreshToken) => {
//   return async (dispatch) => {
//     try {
//       const response = await api.post("/refresh-token", { refreshToken });
//       const { accessToken } = response.data;

//       localStorage.setItem("tokenUser", JSON.stringify(accessToken));

//       dispatch({ type: "REFRESH_TOKEN_SUCCESS", payload: accessToken });
//     } catch (error) {
//       dispatch({ type: "REFRESH_TOKEN_FAILURE", payload: error.message });
//     }
//   };
// };
