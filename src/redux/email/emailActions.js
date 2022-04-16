import emailTypes from "./emailTypes";
import axios from "axios";
import validator from "validator";

import { setfeedback } from "../index";

const URL_API = process.env.REACT_APP_URL_API;

// const signupConfirmedTemplate = require("./templates").signupConfirmed;
const offerRideTemplate = require("./templates").offerRide;
const bookRideByUserTemplate = require("./templates").bookRideByUser;
const bookRideToDriverTemplate = require("./templates").bookRideToDriver;
const acceptedByDriverTemplate = require("./templates").acceptedByDriver;
const acceptedToUserTemplate = require("./templates").acceptedToUser;
const refusedByDriverTemplate = require("./templates").refusedByDriver;
const refusedToUserTemplate = require("./templates").refusedToUser;

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

export const sendEmail = (action, recipient, payload) => {
  const { firstName, lastName, email } = recipient;

  switch (action) {
    case "OFFER_RIDE":
      subject = offerRideTemplate.subject;
      textTemplate = offerRideTemplate.textTemplate(recipient, payload);
      htmlTemplate = offerRideTemplate.htmlTemplate(recipient, payload);
      break;

    case "BOOK_RIDE_BY_USER":
      subject = bookRideByUserTemplate.subject;
      textTemplate = bookRideByUserTemplate.textTemplate(recipient, {
        formValues: payload.formValues,
        ride: payload.ride,
      });
      htmlTemplate = bookRideByUserTemplate.htmlTemplate(recipient, {
        formValues: payload.formValues,
        ride: payload.ride,
      });
      break;

    case "BOOK_RIDE_TO_DRIVER":
      subject = bookRideToDriverTemplate.subject;
      textTemplate = bookRideToDriverTemplate.textTemplate(recipient, {
        formValues: payload.formValues,
        ride: payload.ride,
        passenger: payload.passenger,
      });
      htmlTemplate = bookRideToDriverTemplate.htmlTemplate(recipient, {
        formValues: payload.formValues,
        ride: payload.ride,
        passenger: payload.passenger,
      });
      break;

    case "ACCEPTED_BY_DRIVER":
      subject = acceptedByDriverTemplate.subject;
      textTemplate = acceptedByDriverTemplate.textTemplate(recipient, {
        booking: payload.booking,
        formValues: payload.formValues,
      });
      htmlTemplate = acceptedByDriverTemplate.htmlTemplate(recipient, {
        booking: payload.booking,
        formValues: payload.formValues,
      });
      break;

    case "ACCEPTED_TO_USER":
      subject = acceptedToUserTemplate.subject;
      textTemplate = acceptedToUserTemplate.textTemplate(recipient, {
        booking: payload.booking,
        formValues: payload.formValues,
      });
      htmlTemplate = acceptedToUserTemplate.htmlTemplate(recipient, {
        booking: payload.booking,
        formValues: payload.formValues,
      });
      break;

    case "REFUSED_BY_DRIVER":
      subject = refusedByDriverTemplate.subject;
      textTemplate = refusedByDriverTemplate.textTemplate(recipient, {
        booking: payload.booking,
        formValues: payload.formValues,
      });
      htmlTemplate = refusedByDriverTemplate.htmlTemplate(recipient, {
        booking: payload.booking,
        formValues: payload.formValues,
      });
      break;

    case "REFUSED_TO_USER":
      subject = refusedToUserTemplate.subject;
      textTemplate = refusedToUserTemplate.textTemplate(recipient, {
        booking: payload.booking,
        formValues: payload.formValues,
      });
      htmlTemplate = refusedToUserTemplate.htmlTemplate(recipient, {
        booking: payload.booking,
        formValues: payload.formValues,
      });
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
