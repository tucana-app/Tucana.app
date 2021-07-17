import rideTypes from "./rideTypes";
import axios from "axios";
import dateFormat from "dateformat";

const URL_API = process.env.REACT_APP_URL_API;

// Get all the driver's ride from a user

export const getUserRidesRequested = () => {
  return {
    type: rideTypes.GET_USER_RIDES_REQUEST,
  };
};

export const getUserRides = (userId) => {
  return (dispatch) => {
    dispatch(getUserRidesRequested());

    axios
      .get(URL_API + "/ride/get-rides", {
        params: {
          userId,
        },
      })
      .then((response) => {
        dispatch(getUserRidesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getUserRidesFail(error));
      });
  };
};

export const getUserRidesSuccess = (data) => {
  return {
    type: rideTypes.GET_USER_RIDES_SUCCESS,
    payload: data,
  };
};

export const getUserRidesFail = (error) => {
  return {
    type: rideTypes.GET_USER_RIDES_FAIL,
    payload: error,
  };
};

// Get number of on going rides for user before offering another ride

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
        dispatch(getUserRides(userId));
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
