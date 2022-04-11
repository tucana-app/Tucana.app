import axios from "axios";
import userTypes from "./userTypes";
import bcrypt from "bcryptjs";

import {
  setfeedback,
  setShowLogoutToast,
  setShowLoginToast,
  getDriverNewRidesRequests,
  resetNotifications,
} from "../index";

const URL_API = process.env.REACT_APP_URL_API;

export const registerUserRequested = () => {
  return {
    type: userTypes.REGISTER_USER_REQUESTED,
  };
};

export const registerUser = (formSignupUser) => {
  return (dispatch) => {
    dispatch(registerUserRequested());

    axios
      .post(URL_API + "/auth/signup", {
        formSignupUser,
      })
      .then((response) => {
        // console.log(response.data);

        dispatch(
          setfeedback({
            variant: "success",
            message: response.data.message,
          })
        );

        dispatch(registerUserSuccess(response.data));
      })
      .catch((error) => {
        // console.log(error);

        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch(
          setfeedback({
            variant: "danger",
            message: message,
          })
        );

        dispatch(
          registerUserFail({
            message,
            flag: error.response.data.flag,
          })
        );
      });
  };
};

export const registerUserSuccess = (data) => {
  return {
    type: userTypes.REGISTER_USER_SUCCESS,
    payload: data,
  };
};

export const registerUserFail = (data) => {
  return {
    type: userTypes.REGISTER_USER_FAIL,
    payload: data,
  };
};

// Login user

export const loginRequested = () => {
  return {
    type: userTypes.LOGIN_REQUESTED,
  };
};

export const login = (formLogin) => {
  return (dispatch) => {
    dispatch(loginRequested());

    axios
      .post(URL_API + "/auth/signin", {
        formLogin,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));

          dispatch({
            type: userTypes.LOGIN_SUCCESS,
            payload: { user: response.data },
          });

          dispatch(getDriverNewRidesRequests(response.data.id));
          dispatch(setShowLoginToast(true));
        } else {
          dispatch(
            setfeedback({
              variant: "danger",
              message: "There has been an error",
            })
          );
        }
      })
      .catch((error) => {
        // console.log(error);

        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch(
          setfeedback({
            variant: "danger",
            message: message,
          })
        );

        // If a flag is provided, if not default is "ERROR"
        const flag = (!!error.response && error.response.data.flag) || "ERROR";

        dispatch({
          type: userTypes.LOGIN_FAIL,
          payload: {
            message,
            flag,
          },
        });
      });
  };
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("user");

  dispatch({
    type: userTypes.LOGOUT,
  });

  dispatch(resetNotifications());
  dispatch(setShowLogoutToast(true));
};

// Handle sending email for a forgotten password

export const submitEmailForgotPasswordRequested = () => {
  return {
    type: userTypes.SEND_EMAIL_FORGOT_PASSWORD_REQUESTED,
  };
};

export const submitEmailForgotPassword = (formValue) => {
  return (dispatch) => {
    dispatch(submitEmailForgotPasswordRequested());

    axios
      .get(URL_API + "/auth/send-email-forgot-password", {
        params: {
          email: formValue.email,
        },
      })
      .then((response) => {
        dispatch(submitEmailForgotPasswordSuccess(response.data));

        dispatch(
          setfeedback({
            variant: "success",
            message: response.data.message,
          })
        );
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch(
          setfeedback({
            variant: "danger",
            message,
          })
        );

        dispatch(submitEmailForgotPasswordFail(error.response.data.message));
      });
  };
};

export const submitEmailForgotPasswordSuccess = (data) => {
  return {
    type: userTypes.SEND_EMAIL_FORGOT_PASSWORD_DATA,
    payload: data,
  };
};

export const submitEmailForgotPasswordFail = (error) => {
  return {
    type: userTypes.SEND_EMAIL_FORGOT_PASSWORD_ERROR,
    payload: error,
  };
};

// Handle resetting password

export const checkDeprecatedLinkResetPasswordRequested = () => {
  return {
    type: userTypes.CHECK_DEPRECATED_LINK_RESET_PASSWORD_REQUESTED,
  };
};

export const checkDeprecatedLinkResetPassword = (uuid) => {
  return (dispatch) => {
    dispatch(checkDeprecatedLinkResetPasswordRequested());

    axios
      .get(URL_API + "/auth/check-deprecated-link-reset-password", {
        params: {
          uuid,
        },
      })
      .then((response) => {
        dispatch(checkDeprecatedLinkResetPasswordSuccess(response.data));
      })
      .catch((error) => {
        dispatch(checkDeprecatedLinkResetPasswordFail(error.response.data));
      });
  };
};

export const checkDeprecatedLinkResetPasswordSuccess = (data) => {
  return {
    type: userTypes.CHECK_DEPRECATED_LINK_RESET_PASSWORD_DATA,
    payload: data,
  };
};

export const checkDeprecatedLinkResetPasswordFail = (error) => {
  return {
    type: userTypes.CHECK_DEPRECATED_LINK_RESET_PASSWORD_ERROR,
    payload: error,
  };
};

// Handle resetting password

export const resetPasswordRequested = () => {
  return {
    type: userTypes.RESET_PASSWORD_REQUESTED,
  };
};

export const resetPassword = (formValues, uuid) => {
  return (dispatch) => {
    dispatch(resetPasswordRequested());

    if (formValues.password1 === formValues.password2) {
      const hashedPassword = bcrypt.hashSync(formValues.password1, 10);

      axios
        .put(URL_API + "/auth/reset-password", {
          hashedPassword,
          uuid,
        })
        .then((response) => {
          dispatch(resetPasswordSuccess(response.data));

          dispatch(
            setfeedback({
              variant: "success",
              message: response.data.message,
            })
          );
        })
        .catch((error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          dispatch(
            setfeedback({
              variant: "danger",
              message,
            })
          );

          dispatch(resetPasswordFail(error.response.data.message));
        });
    } else {
      const message = "The passwords must match";

      dispatch(
        setfeedback({
          variant: "danger",
          message,
        })
      );

      dispatch(resetPasswordFail(message));
    }
  };
};

export const resetPasswordSuccess = (data) => {
  return {
    type: userTypes.RESET_PASSWORD_DATA,
    payload: data,
  };
};

export const resetPasswordFail = (error) => {
  return {
    type: userTypes.RESET_PASSWORD_ERROR,
    payload: error,
  };
};
