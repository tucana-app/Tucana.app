import bookingTypes from "./bookingTypes";
import axios from "axios";
import authHeader from "../../helpers/authHeader";
import { setToast } from "../index";

const URL_API = process.env.REACT_APP_URL_API;

// Cancel a booking

export const submitCancelBookingRequested = () => {
  return {
    type: bookingTypes.SUBMIT_CANCEL_BOOKING_REQUEST,
  };
};

export const submitCancelBooking = (bookingId, comment) => {
  return (dispatch) => {
    dispatch(submitCancelBookingRequested());

    axios
      .put(
        URL_API + "/booking/submit-cancel",
        {
          bookingId,
          comment,
        },
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        // console.log(response.data);
        dispatch(submitCancelBookingSuccess(response.data));

        dispatch(
          setToast({
            show: true,
            headerText: "Success",
            bodyText: response.data.date,
            variant: "success",
          })
        );
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
          setToast({
            show: true,
            headerText: "Error",
            bodyText: message,
            variant: "danger",
          })
        );
        dispatch(submitCancelBookingFail(error));
      });
  };
};

export const submitCancelBookingSuccess = (data) => {
  return {
    type: bookingTypes.SUBMIT_CANCEL_BOOKING_SUCCESS,
    payload: data,
  };
};

export const submitCancelBookingFail = (error) => {
  return {
    type: bookingTypes.SUBMIT_CANCEL_BOOKING_FAIL,
    payload: error,
  };
};
