import notificationTypes from "./notificationTypes";
import axios from "axios";
import {
  getUserNewMessages,
  updateDriverState,
  updateUserRatings,
  updateUserExperience,
  getRidesToConfirm,
  getRatingsToDoDriver,
  getRatingsToDoPassenger,
  isAccountClosed,
  getConstants,
} from "../index";

const URL_API = process.env.REACT_APP_URL_API;

export const getNotifications = (user) => {
  return (dispatch) => {
    dispatch(getConstants());
    dispatch(isAccountClosed(user.id));
    dispatch(getDriverNewRidesRequests(user.id));
    dispatch(getPassengerBookingsResponses(user.id));
    dispatch(getUserNewMessages(user.id));
    dispatch(getRidesToConfirm(user));
    dispatch(updateUserRatings(user.id));
    dispatch(updateUserExperience(user.id));
    dispatch(getRatingsToDoPassenger(user.id));

    if (!user.Driver) {
      dispatch(updateDriverState(user.id));
    }

    if (user.Driver) {
      dispatch(getRatingsToDoDriver(user.id, user.Driver.id));
    }
  };
};

// Get all the driver's number of new booking

export const getDriverNewRidesRequestsRequested = () => {
  return {
    type: notificationTypes.GET_DRIVER_NEW_RIDES_REQUESTS_REQUEST,
  };
};

export const getDriverNewRidesRequests = (driverId) => {
  return (dispatch) => {
    dispatch(getDriverNewRidesRequestsRequested());

    axios
      .get(URL_API + "/ride/driver-new-rides-requests", {
        params: {
          driverId,
        },
      })
      .then((response) => {
        // console.log(response.data);
        dispatch(getDriverNewRidesRequestsSuccess(response.data));
      })
      .catch((error) => {
        // console.log(error);
        dispatch(getDriverNewRidesRequestsFail(error));
      });
  };
};

export const getDriverNewRidesRequestsSuccess = (data) => {
  return {
    type: notificationTypes.GET_DRIVER_NEW_RIDES_REQUESTS_SUCCESS,
    payload: data,
  };
};

export const getDriverNewRidesRequestsFail = (error) => {
  return {
    type: notificationTypes.GET_DRIVER_NEW_RIDES_REQUESTS_FAIL,
    payload: error,
  };
};

// Get all the passenger's bookings responses

export const getPassengerBookingsResponsesRequested = () => {
  return {
    type: notificationTypes.GET_PASSENGER_BOOKINGS_RESPONSES_REQUEST,
  };
};

export const getPassengerBookingsResponses = (userId) => {
  return (dispatch) => {
    dispatch(getPassengerBookingsResponsesRequested());

    axios
      .get(URL_API + "/ride/passenger-bookings-responses", {
        params: {
          userId,
        },
      })
      .then((response) => {
        // console.log(response.data);
        dispatch(getPassengerBookingsResponsesSuccess(response.data));
      })
      .catch((error) => {
        // console.log(error);
        dispatch(getPassengerBookingsResponsesFail(error));
      });
  };
};

export const getPassengerBookingsResponsesSuccess = (data) => {
  return {
    type: notificationTypes.GET_PASSENGER_BOOKINGS_RESPONSES_SUCCESS,
    payload: data,
  };
};

export const getPassengerBookingsResponsesFail = (error) => {
  return {
    type: notificationTypes.GET_PASSENGER_BOOKINGS_RESPONSES_FAIL,
    payload: error,
  };
};

// Reset notifications

export const resetNotifications = () => {
  return {
    type: notificationTypes.RESET_NOTIFICATIONS,
  };
};
