import userTypes from "./userTypes";
import globalTypes from "../global/globalTypes";

import AuthService from "../../services/auth.service";

export const register = (username, email, password) => (dispatch) => {
  return AuthService.register(username, email, password).then(
    (response) => {
      dispatch({
        type: userTypes.REGISTER_SUCCESS,
      });

      dispatch({
        type: globalTypes.SET_FEEDBACK,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: userTypes.REGISTER_FAIL,
      });

      dispatch({
        type: globalTypes.SET_FEEDBACK,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const login = (credential, password) => (dispatch) => {
  return AuthService.login(credential, password).then(
    (data) => {
      dispatch({
        type: userTypes.LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: userTypes.LOGIN_FAIL,
      });

      dispatch({
        type: globalTypes.SET_FEEDBACK,
        payload: { message, variant: "danger" },
      });

      return Promise.reject(error);
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: userTypes.LOGOUT,
  });
};
