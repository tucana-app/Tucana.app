import axios from "axios";
import userTypes from "./userTypes";
import validator from "validator";

import {
  setToast,
  getDriverNewRidesRequests,
  resetNotifications,
} from "../index";
import { t } from "i18next";

const URL_API = process.env.REACT_APP_URL_API;

export const registerUserRequested = () => {
  return {
    type: userTypes.REGISTER_USER_REQUESTED,
  };
};

export const registerUser = (values) => {
  return (dispatch) => {
    dispatch(registerUserRequested());

    axios
      .post(URL_API + "/user/signup", {
        values,
      })
      .then((response) => {
        // console.log(response.data);

        dispatch(
          setToast({
            show: true,
            headerText: "Success",
            bodyText: response.data.message,
            variant: "success",
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

        // If a flag is provided, if not default is "ERROR"
        const flag = (!!error.response && error.response.data.flag) || "ERROR";

        dispatch(
          setToast({
            show: true,
            headerText: "Error",
            bodyText: message,
            variant: "danger",
          })
        );

        dispatch(
          registerUserFail({
            message,
            flag,
            userId: error.response.data.userId,
          })
        );

        if (flag !== "NOT_CONFIRMED") {
          dispatch(
            setToast({
              show: true,
              headerText: "Error",
              bodyText: message,
              variant: "danger",
            })
          );
        }
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

// Confirm user

export const confirmEmailRequested = () => {
  return {
    type: userTypes.CONFIRM_EMAIL_REQUESTED,
  };
};

export const confirmEmail = (uuid) => {
  return (dispatch) => {
    dispatch(confirmEmailRequested());

    if (validator.isUUID(uuid)) {
      axios
        .put(URL_API + "/user/confirm", {
          uuid,
        })
        .then((response) => {
          let variant = "";

          switch (response.data.flag) {
            case "ALREADY_CONFIRMED":
              variant = "warning";
              break;

            case "CONFIRMED_SUCCESS":
              variant = "success";
              break;

            default:
              break;
          }

          dispatch(
            setToast({
              show: true,
              headerText: "Message",
              bodyText: response.data.message,
              variant,
            })
          );

          dispatch(
            confirmEmailSuccess({
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
            setToast({
              show: true,
              headerText: "Error",
              bodyText: message,
              variant: "danger",
            })
          );
          dispatch(confirmEmailFail(message));
        });
    } else {
      const message = "Please enter a valid confirmation number in the URL";

      dispatch(
        setToast({
          show: true,
          headerText: "Error",
          bodyText: message,
          variant: "danger",
        })
      );

      dispatch(confirmEmailFail(message));
    }
  };
};

export const confirmEmailSuccess = (message) => {
  return {
    type: userTypes.CONFIRM_EMAIL_DATA,
    payload: message,
  };
};

export const confirmEmailFail = (message) => {
  return {
    type: userTypes.CONFIRM_EMAIL_ERROR,
    payload: message,
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
      .post(URL_API + "/user/signin", {
        formLogin,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));

          dispatch({
            type: userTypes.LOGIN_SUCCESS,
            payload: response.data,
          });

          dispatch(getDriverNewRidesRequests(response.data.id));
        } else {
          // If a flag is provided, if not default is "ERROR"
          const flag = response.data.flag || "ERROR";

          dispatch(
            setToast({
              show: true,
              headerText: "Error",
              bodyText: "There has been an error",
              variant: "danger",
            })
          );

          dispatch({
            type: userTypes.LOGIN_FAIL,
            payload: {
              flag,
            },
          });
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

        // If a flag is provided, if not default is "ERROR"
        const flag = (!!error.response && error.response.data.flag) || "ERROR";

        dispatch({
          type: userTypes.LOGIN_FAIL,
          payload: {
            message,
            flag,
            userId: error.response.data.userId,
          },
        });

        if (flag !== "NOT_CONFIRMED") {
          dispatch(
            setToast({
              show: true,
              headerText: "Error",
              bodyText: message,
              variant: "danger",
            })
          );
        }
      });
  };
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("user");

  dispatch({
    type: userTypes.LOGOUT,
  });

  dispatch(resetNotifications());
  dispatch(
    setToast({
      show: true,
      headerText: "Logged out",
      bodyText: "We hope to see you soon",
      variant: "warning",
    })
  );
};

// Set user's avatar

export const setUserAvatarRequested = () => {
  return {
    type: userTypes.SET_USER_AVATAR_REQUESTED,
  };
};

export const setUserAvatar = (user, avatar) => {
  return (dispatch) => {
    dispatch(setUserAvatarRequested());

    axios
      .post(URL_API + "/user/set-user-avatar", {
        user,
        avatar,
      })
      .then((response) => {
        dispatch(setUserAvatarSuccess(response.data, avatar));
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch(
          setToast({
            show: true,
            headerText: "Error",
            bodyText: message,
            variant: "danger",
          })
        );

        dispatch(setUserAvatarFail(message));
      });
  };
};

export const setUserAvatarSuccess = (data, avatar) => {
  return {
    type: userTypes.SET_USER_AVATAR_DATA,
    payload: { data, avatar },
  };
};

export const setUserAvatarFail = (error) => {
  return {
    type: userTypes.SET_USER_AVATAR_ERROR,
    payload: error,
  };
};

// Set user's first setup

export const setUserFirstSetupRequested = () => {
  return {
    type: userTypes.SET_USER_FIRST_SETUP_REQUESTED,
  };
};

export const setUserFirstSetup = (user) => {
  return (dispatch) => {
    dispatch(setUserFirstSetupRequested());

    axios
      .post(URL_API + "/user/set-user-first-setup", {
        user,
      })
      .then((response) => {
        dispatch(setUserFirstSetupSuccess(response.data));
      })
      .catch((error) => {
        dispatch(setUserFirstSetupFail());
      });
  };
};

export const setUserFirstSetupSuccess = (data) => {
  return {
    type: userTypes.SET_USER_FIRST_SETUP_DATA,
    payload: data,
  };
};

export const setUserFirstSetupFail = (error) => {
  return {
    type: userTypes.SET_USER_FIRST_SETUP_ERROR,
    payload: error,
  };
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
      .get(URL_API + "/user/send-email-forgot-password", {
        params: {
          email: formValue.email,
        },
      })
      .then((response) => {
        dispatch(submitEmailForgotPasswordSuccess(response.data));

        dispatch(
          setToast({
            show: true,
            headerText: "Success",
            bodyText: response.data.message,
            variant: "success",
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
          setToast({
            show: true,
            headerText: "Error",
            bodyText: message,
            variant: "danger",
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

export const resetPasswordRequested = () => {
  return {
    type: userTypes.RESET_PASSWORD_REQUESTED,
  };
};

export const resetPassword = (formValues, uuid) => {
  return (dispatch) => {
    dispatch(resetPasswordRequested());

    if (formValues.password1 === formValues.password2) {
      axios
        .put(URL_API + "/user/reset-password", {
          password: formValues.password1,
          uuid,
        })
        .then((response) => {
          dispatch(resetPasswordSuccess(response.data));

          dispatch(
            setToast({
              show: true,
              headerText: "Success",
              bodyText: response.data.message,
              variant: "success",
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
            setToast({
              show: true,
              headerText: "Error",
              bodyText: message,
              variant: "danger",
            })
          );

          dispatch(resetPasswordFail(message));
        });
    } else {
      const message = "The passwords must match";

      dispatch(
        setToast({
          show: true,
          headerText: "Error",
          bodyText: message,
          variant: "danger",
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
      .get(URL_API + "/user/check-deprecated-link-reset-password", {
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

// Resend confirmation link

export const resendConfirmationLinkRequested = () => {
  return {
    type: userTypes.RESEND_CONFIRMATION_LINK_REQUESTED,
  };
};

export const resendConfirmationLink = (userId) => {
  return (dispatch) => {
    dispatch(resendConfirmationLinkRequested());

    axios
      .post(URL_API + "/user/resend-confirmation-link", {
        userId,
      })
      .then((response) => {
        dispatch(resendConfirmationLinkSuccess(response.data));

        dispatch(
          setToast({
            show: true,
            headerText: "Success",
            bodyText: response.data.message,
            variant: "success",
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
          setToast({
            show: true,
            headerText: "Error",
            bodyText: message,
            variant: "danger",
          })
        );

        dispatch(resendConfirmationLinkFail(message));
      });
  };
};

export const resendConfirmationLinkSuccess = (data) => {
  return {
    type: userTypes.RESEND_CONFIRMATION_LINK_DATA,
    payload: data,
  };
};

export const resendConfirmationLinkFail = (error) => {
  return {
    type: userTypes.RESEND_CONFIRMATION_LINK_ERROR,
    payload: error,
  };
};

// Get submissions for become a driver form

export const getApplicationsBecomeDriverRequested = () => {
  return {
    type: userTypes.GET_SUBMISSIONS_BECOME_DRIVER_REQUESTED,
  };
};

export const getApplicationsBecomeDriver = (userId) => {
  return (dispatch) => {
    dispatch(getApplicationsBecomeDriverRequested());

    axios
      .get(URL_API + "/user/applications-become-driver", {
        params: {
          userId,
        },
      })
      .then((response) => {
        dispatch(getApplicationsBecomeDriverData(response.data));
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch(getApplicationsBecomeDriverFail(message));
      });
  };
};

export const getApplicationsBecomeDriverData = (data) => {
  return {
    type: userTypes.GET_SUBMISSIONS_BECOME_DRIVER_DATA,
    payload: data,
  };
};

export const getApplicationsBecomeDriverFail = (error) => {
  return {
    type: userTypes.GET_SUBMISSIONS_BECOME_DRIVER_ERROR,
    payload: error,
  };
};

// Become a driver application form
// Set the type of ID
export const setApplicationIdType = (idType) => {
  return {
    type: userTypes.SET_FORM_BECOME_DRIVER_ID_TYPE,
    payload: idType,
  };
};

// Set ID number
export const setApplicationIdNumber = (idNumber) => {
  return {
    type: userTypes.SET_FORM_BECOME_DRIVER_ID_NUMBER,
    payload: idNumber,
  };
};

// Set ID country
export const setApplicationLicenseCountry = (country) => {
  return {
    type: userTypes.SET_FORM_BECOME_DRIVER_LICENSE_COUNTRY,
    payload: country,
  };
};

// Set License number
export const setApplicationLicenseNumber = (idNumber) => {
  return {
    type: userTypes.SET_FORM_BECOME_DRIVER_LICENSE_NUMBER,
    payload: idNumber,
  };
};

// Set License country
export const setApplicationIdCountry = (country) => {
  return {
    type: userTypes.SET_FORM_BECOME_DRIVER_ID_COUNTRY,
    payload: country,
  };
};

// Set the car maker
export const setApplicationCarMaker = (maker) => {
  return {
    type: userTypes.SET_FORM_BECOME_DRIVER_CAR_MAKER,
    payload: maker,
  };
};

// Set the car model
export const setApplicationCarModel = (model) => {
  return {
    type: userTypes.SET_FORM_BECOME_DRIVER_CAR_MODEL,
    payload: model,
  };
};

// Set the number plate
export const setApplicationNumberPlate = (numberPlate) => {
  return {
    type: userTypes.SET_FORM_BECOME_DRIVER_NUMBER_PLATE,
    payload: numberPlate,
  };
};

// Set the car year
export const setApplicationCarYear = (year) => {
  return {
    type: userTypes.SET_FORM_BECOME_DRIVER_CAR_YEAR,
    payload: year,
  };
};

// Set the car color
export const setApplicationCarColor = (color) => {
  return {
    type: userTypes.SET_FORM_BECOME_DRIVER_CAR_COLOR,
    payload: color,
  };
};

// Set the car marchamo
export const setApplicationCarMarchamo = (marchamo) => {
  return {
    type: userTypes.SET_FORM_BECOME_DRIVER_CAR_MARCHAMO,
    payload: marchamo,
  };
};

// Set the car riteve month
export const setApplicationCarRiteveMonth = (month) => {
  return {
    type: userTypes.SET_FORM_BECOME_DRIVER_CAR_RITEVE_MONTH,
    payload: month,
  };
};

// Set the car riteve year
export const setApplicationCarRiteveYear = (year) => {
  return {
    type: userTypes.SET_FORM_BECOME_DRIVER_CAR_RITEVE_YEAR,
    payload: year,
  };
};

// Reset application form become driver
export const resetApplicationForm = () => {
  return {
    type: userTypes.RESET_APPLICATION_FORM_BECOME_DRIVER,
  };
};

// Submit form to become a driver

export const submitFormBecomeDriverRequested = () => {
  return {
    type: userTypes.SUBMIT_FORM_BECOME_DRIVER_REQUESTED,
  };
};

export const submitFormBecomeDriver = (user, form) => {
  return (dispatch) => {
    dispatch(submitFormBecomeDriverRequested());

    axios
      .post(URL_API + "/user/submit-become-driver", {
        user,
        form,
      })
      .then((response) => {
        dispatch(submitFormBecomeDriverSuccess(response.data));
        dispatch(getApplicationsBecomeDriver(user.id));
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch(
          setToast({
            show: true,
            headerText: "Error",
            bodyText: message,
            variant: "warning",
          })
        );

        dispatch(submitFormBecomeDriverFail(message));
      });
  };
};

export const submitFormBecomeDriverSuccess = (driver) => {
  return {
    type: userTypes.SUBMIT_FORM_BECOME_DRIVER_SUCCESS,
    payload: driver,
  };
};

export const submitFormBecomeDriverFail = (error) => {
  return {
    type: userTypes.SUBMIT_FORM_BECOME_DRIVER_ERROR,
    payload: error,
  };
};

// Submit form to become a driver

export const updateDriverStateRequested = () => {
  return {
    type: userTypes.UPDATE_DRIVER_STATE_REQUESTED,
  };
};

export const updateDriverState = (userId) => {
  return (dispatch) => {
    dispatch(updateDriverStateRequested());

    axios
      .get(URL_API + "/user/driver-state", {
        params: {
          userId,
        },
      })
      .then((response) => {
        if (response.data) {
          dispatch(updateDriverStateSuccess(response.data));
        } else {
          dispatch(updateDriverStateFail("No updates available"));
        }
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch(updateDriverStateFail(message));
      });
  };
};

export const updateDriverStateSuccess = (driver) => {
  return {
    type: userTypes.UPDATE_DRIVER_STATE_SUCCESS,
    payload: driver,
  };
};

export const updateDriverStateFail = (error) => {
  return {
    type: userTypes.UPDATE_DRIVER_STATE_ERROR,
    payload: error,
  };
};

// Submit form contact

export const submitContactFormRequested = () => {
  return {
    type: userTypes.SUBMIT_CONTACT_FORM_REQUESTED,
  };
};

export const submitContactForm = (user, values) => {
  return (dispatch) => {
    dispatch(submitContactFormRequested());

    axios
      .post(URL_API + "/user/submit-contact-form", { user, values })
      .then((response) => {
        dispatch(submitContactFormSuccess());

        dispatch(
          setToast({
            show: true,
            headerText: "Message sent",
            bodyText: "Thank you for contacting us",
            variant: "success",
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

        dispatch(submitContactFormFail(message));

        dispatch(
          setToast({
            show: true,
            headerText: "Error",
            bodyText: t("translation:global.errors.sendingMessage"),
            variant: "danger",
          })
        );
      });
  };
};

export const submitContactFormSuccess = () => {
  return {
    type: userTypes.SUBMIT_CONTACT_FORM_SUCCESS,
  };
};

export const submitContactFormFail = () => {
  return {
    type: userTypes.SUBMIT_CONTACT_FORM_ERROR,
  };
};
