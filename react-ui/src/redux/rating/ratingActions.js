import ratingTypes from "./ratingTypes";
import axios from "axios";
import { setfeedback } from "../global/globalActions";

const URL_API = process.env.REACT_APP_URL_API;

// Get passenger's ratings received

export const getRatingsReceivedPassengerRequested = () => {
  return {
    type: ratingTypes.GET_RATINGS_RECEIVED_PASSENGER_REQUEST,
  };
};

export const getRatingsReceivedPassenger = (userId) => {
  return (dispatch) => {
    dispatch(getRatingsReceivedPassengerRequested());

    axios
      .get(URL_API + "/rating/get-ratings-received-passenger", {
        params: {
          userId,
        },
      })
      .then((response) => {
        // console.log(response.data);

        dispatch(getRatingsReceivedPassengerSuccess(response.data));
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        // console.log(error);
        dispatch(setfeedback({ message, variant: "danger" }));
        dispatch(getRatingsReceivedPassengerFail(message));
      });
  };
};

export const getRatingsReceivedPassengerSuccess = (data) => {
  return {
    type: ratingTypes.GET_RATINGS_RECEIVED_PASSENGER_SUCCESS,
    payload: data,
  };
};

export const getRatingsReceivedPassengerFail = (error) => {
  return {
    type: ratingTypes.GET_RATINGS_RECEIVED_PASSENGER_FAIL,
    payload: error,
  };
};

// Get passenger's ratings given

export const getRatingsGivenPassengerRequested = () => {
  return {
    type: ratingTypes.GET_RATINGS_GIVEN_PASSENGER_REQUEST,
  };
};

export const getRatingsGivenPassenger = (userId) => {
  return (dispatch) => {
    dispatch(getRatingsGivenPassengerRequested());

    axios
      .get(URL_API + "/rating/get-ratings-given-passenger", {
        params: {
          userId,
        },
      })
      .then((response) => {
        // console.log(response.data);

        dispatch(getRatingsGivenPassengerSuccess(response.data));
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        // console.log(error);
        dispatch(setfeedback({ message, variant: "danger" }));
        dispatch(getRatingsGivenPassengerFail(message));
      });
  };
};

export const getRatingsGivenPassengerSuccess = (data) => {
  return {
    type: ratingTypes.GET_RATINGS_GIVEN_PASSENGER_SUCCESS,
    payload: data,
  };
};

export const getRatingsGivenPassengerFail = (error) => {
  return {
    type: ratingTypes.GET_RATINGS_GIVEN_PASSENGER_FAIL,
    payload: error,
  };
};

// Get driver's ratings received

export const getRatingsReceivedDriverRequested = () => {
  return {
    type: ratingTypes.GET_RATINGS_RECEIVED_DRIVER_REQUEST,
  };
};

export const getRatingsReceivedDriver = (userId) => {
  return (dispatch) => {
    dispatch(getRatingsReceivedDriverRequested());

    axios
      .get(URL_API + "/rating/get-ratings-received-driver", {
        params: {
          userId,
        },
      })
      .then((response) => {
        // console.log(response.data);

        dispatch(getRatingsReceivedDriverSuccess(response.data));
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        // console.log(error);
        dispatch(setfeedback({ message, variant: "danger" }));
        dispatch(getRatingsReceivedDriverFail(message));
      });
  };
};

export const getRatingsReceivedDriverSuccess = (data) => {
  return {
    type: ratingTypes.GET_RATINGS_RECEIVED_DRIVER_SUCCESS,
    payload: data,
  };
};

export const getRatingsReceivedDriverFail = (error) => {
  return {
    type: ratingTypes.GET_RATINGS_RECEIVED_DRIVER_FAIL,
    payload: error,
  };
};

// Get driver's ratings given

export const getRatingsGivenDriverRequested = () => {
  return {
    type: ratingTypes.GET_RATINGS_GIVEN_DRIVER_REQUEST,
  };
};

export const getRatingsGivenDriver = (userId) => {
  return (dispatch) => {
    dispatch(getRatingsGivenDriverRequested());

    axios
      .get(URL_API + "/rating/get-ratings-given-driver", {
        params: {
          userId,
        },
      })
      .then((response) => {
        // console.log(response.data);

        dispatch(getRatingsGivenDriverSuccess(response.data));
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        // console.log(error);
        dispatch(setfeedback({ message, variant: "danger" }));
        dispatch(getRatingsGivenDriverFail(message));
      });
  };
};

export const getRatingsGivenDriverSuccess = (data) => {
  return {
    type: ratingTypes.GET_RATINGS_GIVEN_DRIVER_SUCCESS,
    payload: data,
  };
};

export const getRatingsGivenDriverFail = (error) => {
  return {
    type: ratingTypes.GET_RATINGS_GIVEN_DRIVER_FAIL,
    payload: error,
  };
};

// // Get user's ratings to do

// export const getUserRatingsToDoPassengerRequested = () => {
//   return {
//     type: ratingTypes.GET_USER_RATINGS_TO_DO_PASSENGER_REQUEST,
//   };
// };

// export const getUserRatingsToDoPassenger = (userId) => {
//   return (dispatch) => {
//     dispatch(getUserRatingsToDoPassengerRequested());

//     axios
//       .get(URL_API + "/rating/get-user-ratings-to-do-passenger", {
//         params: {
//           userId,
//         },
//       })
//       .then((response) => {
//         // console.log(response.data);

//         dispatch(getUserRatingsToDoPassengerSuccess(response.data));
//       })
//       .catch((error) => {
//         const message =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();

//         // console.log(error);
//         dispatch(setfeedback({ message, variant: "danger" }));
//         dispatch(getUserRatingsToDoPassengerFail(message));
//       });
//   };
// };

// export const getUserRatingsToDoPassengerSuccess = (data) => {
//   return {
//     type: ratingTypes.GET_USER_RATINGS_TO_DO_PASSENGER_SUCCESS,
//     payload: data,
//   };
// };

// export const getUserRatingsToDoPassengerFail = (error) => {
//   return {
//     type: ratingTypes.GET_USER_RATINGS_TO_DO_PASSENGER_FAIL,
//     payload: error,
//   };
// };
