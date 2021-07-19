import messageTypes from "./messageTypes";
import axios from "axios";

const URL_API = process.env.REACT_APP_URL_API;

// Get all the driver's rides requests

export const getUserRidesRequestsRequested = () => {
  return {
    type: messageTypes.GET_USER_RIDES_REQUESTS_REQUEST,
  };
};

export const getUserRidesRequests = (userId) => {
  return (dispatch) => {
    dispatch(getUserRidesRequestsRequested());

    axios
      .get(URL_API + "/ride/user-rides-requests", {
        params: {
          userId,
        },
      })
      .then((response) => {
        // console.log(response.data)
        dispatch(getUserRidesRequestsSuccess(response.data));
      })
      .catch((error) => {
        // console.log(error)
        dispatch(getUserRidesRequestsFail(error));
      });
  };
};

export const getUserRidesRequestsSuccess = (data) => {
  return {
    type: messageTypes.GET_USER_RIDES_REQUESTS_SUCCESS,
    payload: data,
  };
};

export const getUserRidesRequestsFail = (error) => {
  return {
    type: messageTypes.GET_USER_RIDES_REQUESTS_FAIL,
    payload: error,
  };
};
// Get all the driver's ride from a user

export const getUserNewRidesRequestsRequested = () => {
  return {
    type: messageTypes.GET_USER_NEW_RIDES_REQUESTS_REQUEST,
  };
};

export const getUserNewRidesRequests = (userId) => {
  return (dispatch) => {
    dispatch(getUserNewRidesRequestsRequested());

    axios
      .get(URL_API + "/ride/user-new-rides-requests", {
        params: {
          userId,
        },
      })
      .then((response) => {
        // console.log(response);
        dispatch(getUserNewRidesRequestsSuccess(response.data));
      })
      .catch((error) => {
        // console.log(error);
        dispatch(getUserNewRidesRequestsFail(error));
      });
  };
};

export const getUserNewRidesRequestsSuccess = (data) => {
  return {
    type: messageTypes.GET_USER_NEW_RIDES_REQUESTS_SUCCESS,
    payload: data,
  };
};

export const getUserNewRidesRequestsFail = (error) => {
  return {
    type: messageTypes.GET_USER_NEW_RIDES_REQUESTS_FAIL,
    payload: error,
  };
};
