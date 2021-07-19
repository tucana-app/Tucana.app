import rideTypes from "./rideTypes";
import axios from "axios";
import { setNotificationFeedback } from "../index";

const URL_API = process.env.REACT_APP_URL_API;

// Get all the driver's ride from a user

export const getUserDriverRidesRequested = () => {
  return {
    type: rideTypes.GET_USER_RIDES_REQUEST,
  };
};

export const getUserDriverRides = (userId) => {
  return (dispatch) => {
    dispatch(getUserDriverRidesRequested());

    axios
      .get(URL_API + "/ride/user-rides", {
        params: {
          userId,
        },
      })
      .then((response) => {
        dispatch(getUserDriverRidesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getUserDriverRidesFail(error));
      });
  };
};

export const getUserDriverRidesSuccess = (data) => {
  return {
    type: rideTypes.GET_USER_RIDES_SUCCESS,
    payload: data,
  };
};

export const getUserDriverRidesFail = (error) => {
  return {
    type: rideTypes.GET_USER_RIDES_FAIL,
    payload: error,
  };
};

export const submitFormOfferRideRequested = () => {
  return {
    type: rideTypes.SUBMIT_FORM_OFFER_RIDE_REQUEST,
  };
};

export const submitFormOfferRide = (userId, values) => {
  return (dispatch) => {
    values = {
      ...values,
      dateTime: new Date(`${values.date} ${values.time}:00.000-06`),
    };

    dispatch(submitFormOfferRideRequested());

    axios
      .post(URL_API + "/ride/add-ride", {
        userId,
        formValues: values,
      })
      .then((response) => {
        // console.log(response)
        dispatch(submitFormOfferRideSuccess(response));
        dispatch(getUserDriverRides(userId));
      })
      .catch((error) => {
        // console.log(error);
        dispatch(submitFormOfferRideFail(error));
      });
  };
};

export const submitFormOfferRideSuccess = (data) => {
  return {
    type: rideTypes.SUBMIT_FORM_OFFER_RIDE_SUCCESS,
    payload: data,
  };
};

export const submitFormOfferRideFail = (error) => {
  return {
    type: rideTypes.SUBMIT_FORM_OFFER_RIDE_FAIL,
    payload: error,
  };
};

// Get all the driver's ride from a user

export const getAllRidesRequested = () => {
  return {
    type: rideTypes.GET_ALL_RIDES_REQUEST,
  };
};

export const getAllRides = () => {
  return (dispatch) => {
    dispatch(getAllRidesRequested());

    axios
      .get(URL_API + "/ride/all-rides")
      .then((response) => {
        // console.log(response);
        dispatch(getAllRidesSuccess(response.data));
      })
      .catch((error) => {
        // console.log(error);
        dispatch(getAllRidesFail(error));
      });
  };
};

export const getAllRidesSuccess = (data) => {
  return {
    type: rideTypes.GET_ALL_RIDES_SUCCESS,
    payload: data,
  };
};

export const getAllRidesFail = (error) => {
  return {
    type: rideTypes.GET_ALL_RIDES_FAIL,
    payload: error,
  };
};

export const submitFormBookRideRequested = () => {
  return {
    type: rideTypes.SUBMIT_FORM_BOOK_RIDE_REQUEST,
  };
};

export const submitFormBookRide = (userId, rideId, formValues) => {
  return (dispatch) => {
    dispatch(submitFormBookRideRequested());

    axios
      .post(URL_API + "/ride/book", {
        userId,
        rideId,
        formValues,
      })
      .then((response) => {
        // console.log(response.data);

        dispatch(
          setNotificationFeedback({
            variant: "success",
            message: response.data,
          })
        );
        dispatch(submitFormBookRideSuccess(response));
        dispatch(getAllRides());
        dispatch(getUserBookingRide(userId, rideId));
      })
      .catch((error) => {
        // console.log(error);

        dispatch(
          setNotificationFeedback({
            variant: "danger",
            message: error.message,
          })
        );
        dispatch(submitFormBookRideFail(error));
      });
  };
};

export const submitFormBookRideSuccess = (data) => {
  return {
    type: rideTypes.SUBMIT_FORM_BOOK_RIDE_SUCCESS,
    payload: data,
  };
};

export const submitFormBookRideFail = (error) => {
  return {
    type: rideTypes.SUBMIT_FORM_BOOK_RIDE_FAIL,
    payload: error,
  };
};

// Get all the booking from one user on the ride's page

export const getUserBookingRideRequested = () => {
  return {
    type: rideTypes.GET_USER_RIDE_BOOKING_REQUEST,
  };
};

export const getUserBookingRide = (userId, rideId) => {
  return (dispatch) => {
    dispatch(getUserBookingRideRequested());

    axios
      .get(URL_API + "/ride/user-booking-ride", {
        params: {
          userId,
          rideId,
        },
      })
      .then((response) => {
        // console.log(response);
        dispatch(getUserBookingRideSuccess(response.data));
      })
      .catch((error) => {
        // console.log(error);
        dispatch(getUserBookingRideFail(error));
      });
  };
};

export const getUserBookingRideSuccess = (data) => {
  return {
    type: rideTypes.GET_USER_RIDE_BOOKING_SUCCESS,
    payload: data,
  };
};

export const getUserBookingRideFail = (error) => {
  return {
    type: rideTypes.GET_USER_RIDE_BOOKING_FAIL,
    payload: error,
  };
};
