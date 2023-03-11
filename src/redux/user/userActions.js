import axios from "axios";
import userTypes from "./userTypes";
import validator from "validator";
import { parseText } from "../../helpers";
import authHeader from "../../helpers/authHeader";

import {
  setToast,
  getNotifications,
  resetNotifications,
  getConstants,
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

          dispatch(getConstants());
          dispatch(getNotifications(response.data));
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
      .post(
        URL_API + "/user/set-user-avatar",
        {
          user,
          avatar,
        },
        {
          headers: authHeader(),
        }
      )
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

// Handle sending email for a forgotten password

export const submitEmailForgotPasswordRequested = () => {
  return {
    type: userTypes.SEND_EMAIL_FORGOT_PASSWORD_REQUESTED,
  };
};

export const submitEmailForgotPassword = (form) => {
  return (dispatch) => {
    dispatch(submitEmailForgotPasswordRequested());

    axios
      .get(URL_API + "/user/send-email-forgot-password", {
        headers: authHeader(),
        params: {
          email: form.email.replace(" ", ""),
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

        dispatch(submitEmailForgotPasswordFail(message));
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
        headers: authHeader(),
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

// Get a single driver's application

export const getApplicationBecomeDriverRequested = () => {
  return {
    type: userTypes.GET_APPLICATION_BECOME_DRIVER_REQUESTED,
  };
};

export const getApplicationBecomeDriver = (userId, applicationId) => {
  return (dispatch) => {
    dispatch(getApplicationBecomeDriverRequested());

    axios
      .get(URL_API + "/user/application-become-driver", {
        headers: authHeader(),
        params: {
          userId,
          applicationId,
        },
      })
      .then((response) => {
        dispatch(getApplicationBecomeDriverData(response.data));
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch(getApplicationBecomeDriverFail(message));
      });
  };
};

export const getApplicationBecomeDriverData = (data) => {
  return {
    type: userTypes.GET_APPLICATION_BECOME_DRIVER_DATA,
    payload: data,
  };
};

export const getApplicationBecomeDriverFail = (error) => {
  return {
    type: userTypes.GET_APPLICATION_BECOME_DRIVER_ERROR,
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
      .post(
        URL_API + "/user/submit-become-driver",
        {
          user,
          form,
        },
        {
          headers: authHeader(),
        }
      )
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

// Update driver's state

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
        headers: authHeader(),
        params: {
          userId,
        },
      })
      .then((response) => {
        // console.log(response.data);

        if (response.data) {
          let user = JSON.parse(localStorage.getItem("user"));

          if (user) {
            user = {
              ...user,
              Driver: response.data,
            };

            localStorage.setItem("user", JSON.stringify(user));
          }

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

// Update user's ratings

export const updateUserRatingsRequested = () => {
  return {
    type: userTypes.UPDATE_USER_RATINGS_REQUESTED,
  };
};

export const updateUserRatings = (userId) => {
  return (dispatch) => {
    dispatch(updateUserRatingsRequested());

    axios
      .get(URL_API + "/user/update-ratings", {
        headers: authHeader(),
        params: {
          userId,
        },
      })
      .then((response) => {
        if (response.data) {
          let user = JSON.parse(localStorage.getItem("user"));
          if (user) {
            user = {
              ...user,
              Rating: response.data,
            };

            localStorage.setItem("user", JSON.stringify(user));
          }

          dispatch(updateUserRatingsSuccess(response.data));
        } else {
          dispatch(updateUserRatingsFail("No updates available"));
        }
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch(updateUserRatingsFail(message));
      });
  };
};

export const updateUserRatingsSuccess = (ratings) => {
  return {
    type: userTypes.UPDATE_USER_RATINGS_SUCCESS,
    payload: ratings,
  };
};

export const updateUserRatingsFail = (error) => {
  return {
    type: userTypes.UPDATE_USER_RATINGS_ERROR,
    payload: error,
  };
};

// Update user's experience

export const updateUserExperienceRequested = () => {
  return {
    type: userTypes.UPDATE_USER_EXPERIENCE_REQUESTED,
  };
};

export const updateUserExperience = (userId) => {
  return (dispatch) => {
    dispatch(updateUserExperienceRequested());

    axios
      .get(URL_API + "/user/update-experience", {
        headers: authHeader(),
        params: {
          userId,
        },
      })
      .then((response) => {
        if (response.data) {
          let user = JSON.parse(localStorage.getItem("user"));
          if (user) {
            user = {
              ...user,
              ExperienceUser: response.data,
            };

            localStorage.setItem("user", JSON.stringify(user));
          }

          dispatch(updateUserExperienceSuccess(response.data));
        } else {
          dispatch(updateUserExperienceFail("No updates available"));
        }
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch(updateUserExperienceFail(message));
      });
  };
};

export const updateUserExperienceSuccess = (experience) => {
  return {
    type: userTypes.UPDATE_USER_EXPERIENCE_SUCCESS,
    payload: experience,
  };
};

export const updateUserExperienceFail = (error) => {
  return {
    type: userTypes.UPDATE_USER_EXPERIENCE_ERROR,
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
      .post(
        URL_API + "/user/submit-contact-form",
        {
          user,
          values,
        },
        {
          headers: authHeader(),
        }
      )
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

// Edit bio

export const submitEditBioRequested = () => {
  return {
    type: userTypes.SUBMIT_EDIT_BIO_REQUESTED,
  };
};

export const submitEditBio = (userId, values) => {
  return (dispatch) => {
    dispatch(submitEditBioRequested());

    const parsingResult = parseText(values.bio);

    if (parsingResult.value === 0) {
      axios
        .put(
          URL_API + "/user/submit-edit-bio",
          {
            userId,
            values,
          },
          {
            headers: authHeader(),
          }
        )
        .then((response) => {
          let user = JSON.parse(localStorage.getItem("user"));
          if (user) {
            user = {
              ...user,
              biography: values.bio,
            };

            localStorage.setItem("user", JSON.stringify(user));
          }

          dispatch(
            setToast({
              show: true,
              headerText: "Success",
              bodyText: "Your bio has been updated",
              variant: "success",
            })
          );

          dispatch(submitEditBioSuccess(response.data));
        })
        .catch((error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          dispatch(submitEditBioFail(message));

          dispatch(
            setToast({
              show: true,
              headerText: "Error",
              bodyText: t("translation:global.errors.failUpdateBio"),
              variant: "danger",
            })
          );
        });
    } else {
      dispatch(
        setToast({
          show: true,
          headerText: "Warning",
          bodyText: parsingResult.message,
          variant: "warning",
        })
      );

      dispatch(submitEditBioFail(parsingResult.message));
    }
  };
};

export const submitEditBioSuccess = (data) => {
  return {
    type: userTypes.SUBMIT_EDIT_BIO_SUCCESS,
    payload: data,
  };
};

export const submitEditBioFail = (error) => {
  return {
    type: userTypes.SUBMIT_EDIT_BIO_ERROR,
    payload: error,
  };
};

// Edit password

export const submitEditPasswordRequested = () => {
  return {
    type: userTypes.SUBMIT_EDIT_PASSWORD_REQUESTED,
  };
};

export const submitEditPassword = (user, values) => {
  return (dispatch) => {
    dispatch(submitEditPasswordRequested());

    axios
      .put(
        URL_API + "/user/submit-edit-password",
        {
          user,
          values,
        },
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        dispatch(
          setToast({
            show: true,
            headerText: "Success",
            bodyText: "Your password has been updated",
            variant: "success",
          })
        );

        dispatch(submitEditPasswordSuccess(response.data));
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch(submitEditPasswordFail(message));

        dispatch(
          setToast({
            show: true,
            headerText: "Error",
            bodyText: message,
            variant: "danger",
          })
        );
      });
  };
};

export const submitEditPasswordSuccess = (data) => {
  return {
    type: userTypes.SUBMIT_EDIT_PASSWORD_SUCCESS,
    payload: data,
  };
};

export const submitEditPasswordFail = (error) => {
  return {
    type: userTypes.SUBMIT_EDIT_PASSWORD_ERROR,
    payload: error,
  };
};

// Edit password

export const submitEditDateOfBirthRequested = () => {
  return {
    type: userTypes.SUBMIT_EDIT_DATE_OF_BIRTH_REQUESTED,
  };
};

export const submitEditDateOfBirth = (userId, values) => {
  return (dispatch) => {
    dispatch(submitEditDateOfBirthRequested());
    const { day, month, year } = values;
    const date = new Date(year, month - 1, day);

    axios
      .put(
        URL_API + "/user/submit-edit-date-of-birth",
        {
          userId,
          date,
        },
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        let user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          user = {
            ...user,
            dateOfBirth: response.data.dateOfBirth,
          };

          localStorage.setItem("user", JSON.stringify(user));
        }

        dispatch(
          setToast({
            show: true,
            headerText: "Success",
            bodyText: "Your date of birth has been added",
            variant: "success",
          })
        );

        dispatch(submitEditDateOfBirthSuccess(response.data));
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch(submitEditDateOfBirthFail(message));

        dispatch(
          setToast({
            show: true,
            headerText: "Error",
            bodyText: message,
            variant: "danger",
          })
        );
      });
  };
};

export const submitEditDateOfBirthSuccess = (data) => {
  return {
    type: userTypes.SUBMIT_EDIT_DATE_OF_BIRTH_SUCCESS,
    payload: data,
  };
};

export const submitEditDateOfBirthFail = (error) => {
  return {
    type: userTypes.SUBMIT_EDIT_DATE_OF_BIRTH_ERROR,
    payload: error,
  };
};

// Close user's account

export const submitCloseAccountRequested = () => {
  return {
    type: userTypes.SUBMIT_REMOVE_ACCOUNT_REQUESTED,
  };
};

export const submitCloseAccount = (user, values) => {
  return (dispatch) => {
    dispatch(submitCloseAccountRequested());

    axios
      .post(
        URL_API + "/user/submit-close-account",
        {
          user,
          values,
        },
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        dispatch(submitCloseAccountSuccess(response.data));
        dispatch(logout());
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch(submitCloseAccountFail(message));

        dispatch(
          setToast({
            show: true,
            headerText: "Error",
            bodyText: message,
            variant: "danger",
          })
        );
      });
  };
};

export const submitCloseAccountSuccess = (data) => {
  return {
    type: userTypes.SUBMIT_REMOVE_ACCOUNT_SUCCESS,
    payload: data,
  };
};

export const submitCloseAccountFail = (error) => {
  return {
    type: userTypes.SUBMIT_REMOVE_ACCOUNT_ERROR,
    payload: error,
  };
};

// Check if the user's account has been closed

export const isAccountClosedRequested = () => {
  return {
    type: userTypes.IS_ACCOUNT_CLOSED_REQUESTED,
  };
};

export const isAccountClosed = (userId) => {
  return (dispatch) => {
    dispatch(isAccountClosedRequested());

    axios
      .get(URL_API + "/user/is-account-closed", {
        headers: authHeader(),
        params: { userId },
      })
      .then((response) => {
        dispatch(isAccountClosedSuccess(response.data));
        if (response.data.isClosed) {
          dispatch(logout());
        }
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch(isAccountClosedFail(message));
      });
  };
};

export const isAccountClosedSuccess = (data) => {
  return {
    type: userTypes.IS_ACCOUNT_CLOSED_SUCCESS,
    payload: data,
  };
};

export const isAccountClosedFail = (error) => {
  return {
    type: userTypes.IS_ACCOUNT_CLOSED_ERROR,
    payload: error,
  };
};

// Update user

export const updateUserRequested = () => {
  return {
    type: userTypes.UPDATE_USER_REQUESTED,
  };
};

export const updateUser = (userId) => {
  return (dispatch) => {
    dispatch(updateUserRequested());

    axios
      .get(URL_API + "/user/update", {
        headers: authHeader(),
        params: {
          userId,
        },
      })
      .then((response) => {
        const user = JSON.parse(localStorage.getItem("user"));

        const updatedUser = {
          accessToken: user.accessToken,
          ...response.data,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        dispatch(updateUserSuccess(updatedUser));
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch(updateUserFail(message));
      });
  };
};

export const updateUserSuccess = (updatedUser) => {
  return {
    type: userTypes.UPDATE_USER_SUCCESS,
    payload: updatedUser,
  };
};

export const updateUserFail = (error) => {
  return {
    type: userTypes.UPDATE_USER_ERROR,
    payload: error,
  };
};

// Get the current user's driver profile

export const getDriverProfileRequested = () => {
  return {
    type: userTypes.GET_DRIVER_PROFILE_REQUEST,
  };
};

export const getDriverProfile = (username) => {
  return (dispatch) => {
    dispatch(getDriverProfileRequested());

    axios
      .get(URL_API + "/driver/" + username, { headers: authHeader() })
      .then((response) => {
        // console.log(response.data);

        if (response.data) {
          dispatch(getDriverProfileSuccess(response.data));
        } else {
          dispatch(getDriverProfileFail("Error"));
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

        dispatch(getDriverProfileFail(message));
      });
  };
};

export const getDriverProfileSuccess = (data) => {
  return {
    type: userTypes.GET_DRIVER_PROFILE_SUCCESS,
    payload: data,
  };
};

export const getDriverProfileFail = (error) => {
  return {
    type: userTypes.GET_DRIVER_PROFILE_FAIL,
    payload: error,
  };
};

// Get a user public's profile

export const getPublicProfileRequested = () => {
  return {
    type: userTypes.GET_PUBLIC_PROFILE_REQUEST,
  };
};

export const getPublicProfile = (username) => {
  return (dispatch) => {
    dispatch(getPublicProfileRequested());

    axios
      .get(URL_API + "/profile/" + username, { headers: authHeader() })
      .then((response) => {
        // console.log(response.data);

        if (response.data) {
          dispatch(getPublicProfileSuccess(response.data));
        } else {
          dispatch(getPublicProfileFail("Error"));
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

        dispatch(getPublicProfileFail(message));
      });
  };
};

export const getPublicProfileSuccess = (data) => {
  return {
    type: userTypes.GET_PUBLIC_PROFILE_SUCCESS,
    payload: data,
  };
};

export const getPublicProfileFail = (error) => {
  return {
    type: userTypes.GET_PUBLIC_PROFILE_FAIL,
    payload: error,
  };
};

// Get a driver's earnings

export const getDriverEarningsRequested = () => {
  return {
    type: userTypes.GET_DRIVER_EARNINGS_REQUEST,
  };
};

export const getDriverEarnings = (userId) => {
  return (dispatch) => {
    dispatch(getDriverEarningsRequested());

    axios
      .get(URL_API + "/driver/get-earnings", {
        headers: authHeader(),
        params: {
          userId,
        },
      })
      .then((response) => {
        // console.log(response.data);

        if (response.data) {
          dispatch(getDriverEarningsSuccess(response.data));
        } else {
          dispatch(getDriverEarningsFail("Error"));
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

        dispatch(getDriverEarningsFail(message));
      });
  };
};

export const getDriverEarningsSuccess = (data) => {
  return {
    type: userTypes.GET_DRIVER_EARNINGS_SUCCESS,
    payload: data,
  };
};

export const getDriverEarningsFail = (error) => {
  return {
    type: userTypes.GET_DRIVER_EARNINGS_FAIL,
    payload: error,
  };
};
