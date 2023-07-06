import api from "./api";

import axios from "axios";

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

export const refreshToken = (config) => {
  return async (dispatch) => {
    let refresh = localStorage.getItem('refreshTokenUser');

    refresh = refresh.substring(1, refresh.length - 1)

    const headers = {
      'Content-Type': 'application/json',
    };
    
    try {
      const response = await axios.post('http://localhost:8000/api/token/refresh/', { refresh: refresh }, { headers });
      const accessToken = response.data.access;

      localStorage.setItem("tokenUser", JSON.stringify(accessToken));

      config.headers.Authorization = `Bearer ${accessToken}`;

      dispatch({ type: "REFRESH_TOKEN_SUCCESS", payload: accessToken });

      return { response, error: null };
    } catch (error) {
      dispatch({ type: "REFRESH_TOKEN_FAILURE", payload: error.message });

      throw error;
    }
  };
};
