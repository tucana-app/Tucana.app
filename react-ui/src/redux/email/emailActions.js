import emailTypes from "./emailTypes";
import axios from "axios";
import validator from "validator";

import { setfeedback } from "../index";

// const signupConfirmedTemplate = require("./templates").signupConfirmed;
const offerRideTemplate = require("./templates").offerRide;

const URL_API = process.env.REACT_APP_URL_API;

// let firstName = "";
// let lastName = "";
// let email = "";
// let username = "";
let subject = "";
let textTemplate = "";
let htmlTemplate = "";

export const confirmEmailRequested = () => {
  return {
    type: emailTypes.CONFIRM_EMAIL_REQUEST,
  };
};

export const confirmEmail = (confirmEmailUUID) => {
  return (dispatch) => {
    dispatch(confirmEmailRequested());

    if (validator.isUUID(confirmEmailUUID)) {
      axios
        .put(URL_API + "/auth/confirm", {
          confirmEmailUUID,
        })
        .then((response) => {
          let variant = "";

          switch (response.data.flag) {
            case "already_confirmed":
              variant = "warning";
              break;

            case "confirmed_success":
              variant = "success";
              break;

            default:
              break;
          }
          dispatch(
            setfeedback({
              variant,
              message: response.data.message,
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
            setfeedback({
              variant: "danger",
              message: message,
            })
          );
          dispatch(confirmEmailFail(message));
        });
    } else {
      const message = "Please enter a valid confirmation number in the URL";

      dispatch(
        setfeedback({
          variant: "danger",
          message: message,
        })
      );

      dispatch(confirmEmailFail(message));
    }
  };
};

export const confirmEmailSuccess = (message) => {
  return {
    type: emailTypes.CONFIRM_EMAIL_SUCCESS,
    payload: message,
  };
};

export const confirmEmailFail = (message) => {
  return {
    type: emailTypes.CONFIRM_EMAIL_FAIL,
    payload: message,
  };
};

export const sendEmail = (action, user, payload) => {
  const { firstName, lastName, email } = user;

  switch (action) {
    case "OFFER_RIDE":
      subject = "Your ride is online | Ride.CR";
      textTemplate = offerRideTemplate.textTemplateOfferRide(user, payload);
      htmlTemplate = offerRideTemplate.htmlTemplateOfferRide(user, payload);
      break;

    default:
      break;
  }

  return () => {
    axios.post(URL_API + "/email/send-email", {
      firstName,
      lastName,
      email,
      subject,
      text: textTemplate,
      html: htmlTemplate,
    });
  };
};
