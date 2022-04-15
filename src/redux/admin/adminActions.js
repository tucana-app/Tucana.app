import adminTypes from "./adminTypes";
import axios from "axios";

const URL_API = process.env.REACT_APP_URL_API;

// An admin is requesting the list of all users

export const admin_getUsersRequested = () => {
  return {
    type: adminTypes.ADMIN_GET_USERS_REQUEST,
  };
};

export const admin_getUsers = (currentUser) => {
  return (dispatch) => {
    if (currentUser.adminId) {
      dispatch(admin_getUsersRequested());

      axios
        .get(URL_API + "/admin/list-users")
        .then((response) => {
          dispatch(admin_getUsersSuccess(response.data));
        })
        .catch((error) => {
          dispatch(admin_getUsersFail(error));
        });
    } else {
      dispatch(admin_getUsersFail("Not autorized"));
    }
  };
};

export const admin_getUsersSuccess = (data) => {
  return {
    type: adminTypes.ADMIN_GET_USERS_SUCCESS,
    payload: data,
  };
};

export const admin_getUsersFail = (error) => {
  return {
    type: adminTypes.ADMIN_GET_USERS_FAIL,
    payload: error,
  };
};

// Admin is requesting the list of all rides

export const admin_getRidesRequested = () => {
  return {
    type: adminTypes.ADMIN_GET_RIDES_REQUEST,
  };
};

export const admin_getRides = (currentUser) => {
  return (dispatch) => {
    if (currentUser.adminId) {
      dispatch(admin_getRidesRequested());

      axios
        .get(URL_API + "/admin/list-rides")
        .then((response) => {
          dispatch(admin_getRidesSuccess(response.data));
        })
        .catch((error) => {
          dispatch(admin_getRidesFail(error));
        });
    } else {
      dispatch(admin_getRidesFail("Not autorized"));
    }
  };
};

export const admin_getRidesSuccess = (data) => {
  return {
    type: adminTypes.ADMIN_GET_RIDES_SUCCESS,
    payload: data,
  };
};

export const admin_getRidesFail = (error) => {
  return {
    type: adminTypes.ADMIN_GET_RIDES_FAIL,
    payload: error,
  };
};

// Admin is requesting the details of a single ride

export const admin_getSingleRideRequested = () => {
  return {
    type: adminTypes.ADMIN_GET_SINGLE_RIDE_REQUEST,
  };
};

export const admin_getSingleRide = (currentUser, rideId) => {
  return (dispatch) => {
    if (currentUser.adminId) {
      dispatch(admin_getSingleRideRequested());

      axios
        .get(URL_API + "/admin/single-ride", {
          params: {
            rideId,
          },
        })
        .then((response) => {
          dispatch(admin_getSingleRideSuccess(response.data));
        })
        .catch((error) => {
          dispatch(admin_getSingleRideFail(error));
        });
    } else {
      dispatch(admin_getSingleRideFail("Not autorized"));
    }
  };
};

export const admin_getSingleRideSuccess = (data) => {
  return {
    type: adminTypes.ADMIN_GET_SINGLE_RIDE_SUCCESS,
    payload: data,
  };
};

export const admin_getSingleRideFail = (error) => {
  return {
    type: adminTypes.ADMIN_GET_SINGLE_RIDE_FAIL,
    payload: error,
  };
};

// Admin is requesting to view all bookings for a single ride

export const admin_getSingleRideAllBookingsRequested = () => {
  return {
    type: adminTypes.ADMIN_GET_SINGLE_RIDE_ALL_BOOKINGS_REQUEST,
  };
};

export const admin_getSingleRideAllBookings = (currentUser, rideId) => {
  return (dispatch) => {
    if (currentUser.adminId) {
      dispatch(admin_getSingleRideAllBookingsRequested());

      axios
        .get(URL_API + "/admin/single-ride-all-bookings", {
          params: {
            rideId,
          },
        })
        .then((response) => {
          dispatch(admin_getSingleRideAllBookingsSuccess(response.data));
        })
        .catch((error) => {
          dispatch(admin_getSingleRideAllBookingsFail(error));
        });
    } else {
      dispatch(admin_getSingleRideAllBookingsFail("Not autorized"));
    }
  };
};

export const admin_getSingleRideAllBookingsSuccess = (data) => {
  return {
    type: adminTypes.ADMIN_GET_SINGLE_RIDE_ALL_BOOKINGS_SUCCESS,
    payload: data,
  };
};

export const admin_getSingleRideAllBookingsFail = (error) => {
  return {
    type: adminTypes.ADMIN_GET_SINGLE_RIDE_ALL_BOOKINGS_FAIL,
    payload: error,
  };
};

// Admin is requesting to send a test email

export const admin_sendTestEmailRequested = () => {
  return {
    type: adminTypes.ADMIN_SEND_TEST_EMAIL_REQUEST,
  };
};

export const admin_sendTestEmail = (currentUser, email) => {
  return (dispatch) => {
    if (currentUser.adminId) {
      dispatch(admin_sendTestEmailRequested());

      axios
        .get(URL_API + "/admin/send-test-email", {
          params: {
            email,
          },
        })
        .then((response) => {
          dispatch(admin_sendTestEmailSuccess(response.data));
        })
        .catch((error) => {
          dispatch(admin_sendTestEmailFail(error));
        });
    } else {
      dispatch(admin_sendTestEmailFail("Not autorized"));
    }
  };
};

export const admin_sendTestEmailSuccess = (data) => {
  return {
    type: adminTypes.ADMIN_SEND_TEST_EMAIL_SUCCESS,
    payload: data,
  };
};

export const admin_sendTestEmailFail = (error) => {
  return {
    type: adminTypes.ADMIN_SEND_TEST_EMAIL_FAIL,
    payload: error,
  };
};

// Admin is requesting all passenger's ratings

export const admin_getPassengersRatingsRequested = () => {
  return {
    type: adminTypes.ADMIN_GET_PASSENGERS_RATINGS_REQUEST,
  };
};

export const admin_getPassengersRatings = (currentUser) => {
  return (dispatch) => {
    if (currentUser.adminId) {
      dispatch(admin_getPassengersRatingsRequested());

      axios
        .get(URL_API + "/admin/get-passengers-ratings")
        .then((response) => {
          dispatch(admin_getPassengersRatingsSuccess(response.data));
        })
        .catch((error) => {
          dispatch(admin_getPassengersRatingsFail(error));
        });
    } else {
      dispatch(admin_getPassengersRatingsFail("Not autorized"));
    }
  };
};

export const admin_getPassengersRatingsSuccess = (data) => {
  return {
    type: adminTypes.ADMIN_GET_PASSENGERS_RATINGS_SUCCESS,
    payload: data,
  };
};

export const admin_getPassengersRatingsFail = (error) => {
  return {
    type: adminTypes.ADMIN_GET_PASSENGERS_RATINGS_FAIL,
    payload: error,
  };
};

// Admin is requesting all driver's ratings

export const admin_getDriversRatingsRequested = () => {
  return {
    type: adminTypes.ADMIN_GET_DRIVERS_RATINGS_REQUEST,
  };
};

export const admin_getDriversRatings = (currentUser) => {
  return (dispatch) => {
    if (currentUser.adminId) {
      dispatch(admin_getDriversRatingsRequested());

      axios
        .get(URL_API + "/admin/get-drivers-ratings")
        .then((response) => {
          dispatch(admin_getDriversRatingsSuccess(response.data));
        })
        .catch((error) => {
          dispatch(admin_getDriversRatingsFail(error));
        });
    } else {
      dispatch(admin_getDriversRatingsFail("Not autorized"));
    }
  };
};

export const admin_getDriversRatingsSuccess = (data) => {
  return {
    type: adminTypes.ADMIN_GET_DRIVERS_RATINGS_SUCCESS,
    payload: data,
  };
};

export const admin_getDriversRatingsFail = (error) => {
  return {
    type: adminTypes.ADMIN_GET_DRIVERS_RATINGS_FAIL,
    payload: error,
  };
};
