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
        type: globalTypes.SET_FEEDBACK_NOTIFICATION,
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
        type: globalTypes.SET_FEEDBACK_NOTIFICATION,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      dispatch({
        type: userTypes.LOGIN_SUCCESS,
        payload: { user: data },
      });

      dispatch({
        type: userTypes.CHECK_USERS_MESSAGES,
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
        type: globalTypes.SET_FEEDBACK_NOTIFICATION,
        payload: message,
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
