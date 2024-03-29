import ratingTypes from "./ratingTypes";
import axios from "axios";
import { setToast, getNotifications } from "../index";
import { parseText } from "../../helpers";
import authHeader from "../../helpers/authHeader";
import { t } from "i18next";

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
        headers: authHeader(),
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
        dispatch(
          setToast({
            show: true,
            headerText: "Error",
            bodyText: message,
            variant: "danger",
          })
        );
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
        headers: authHeader(),
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
        dispatch(
          setToast({
            show: true,
            headerText: "Error",
            bodyText: message,
            variant: "danger",
          })
        );
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
        headers: authHeader(),
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
        dispatch(
          setToast({
            show: true,
            headerText: "Error",
            bodyText: message,
            variant: "danger",
          })
        );
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
        headers: authHeader(),
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
        dispatch(
          setToast({
            show: true,
            headerText: "Error",
            bodyText: message,
            variant: "danger",
          })
        );
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

// Get a single rating to do

export const getRatingToDoRequested = () => {
  return {
    type: ratingTypes.GET_RATING_TO_DO_REQUEST,
  };
};

export const getRatingToDo = (bookingId, userId) => {
  return (dispatch) => {
    dispatch(getRatingToDoRequested());

    axios
      .get(URL_API + "/rating/get-rating-to-do", {
        headers: authHeader(),
        params: {
          bookingId,
          userId,
        },
      })
      .then((response) => {
        // console.log(response.data);

        dispatch(getRatingToDoSuccess(response.data));
      })
      .catch((error) => {
        // console.log(error);

        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch(getRatingToDoFail(message));
      });
  };
};

export const getRatingToDoSuccess = (data) => {
  return {
    type: ratingTypes.GET_RATING_TO_DO_SUCCESS,
    payload: data,
  };
};

export const getRatingToDoFail = (error) => {
  return {
    type: ratingTypes.GET_RATING_TO_DO_FAIL,
    payload: error,
  };
};

// Get passenger's ratings to do

export const getRatingsToDoPassengerRequested = () => {
  return {
    type: ratingTypes.GET_RATINGS_TO_DO_PASSENGER_REQUEST,
  };
};

export const getRatingsToDoPassenger = (userId) => {
  return (dispatch) => {
    dispatch(getRatingsToDoPassengerRequested());

    axios
      .get(URL_API + "/rating/get-ratings-to-do-passenger", {
        headers: authHeader(),
        params: {
          userId,
        },
      })
      .then((response) => {
        // console.log(response.data);

        dispatch(getRatingsToDoPassengerSuccess(response.data));
      })
      .catch((error) => {
        // console.log(error);

        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch(getRatingsToDoPassengerFail(message));
      });
  };
};

export const getRatingsToDoPassengerSuccess = (data) => {
  return {
    type: ratingTypes.GET_RATINGS_TO_DO_PASSENGER_SUCCESS,
    payload: data,
  };
};

export const getRatingsToDoPassengerFail = (error) => {
  return {
    type: ratingTypes.GET_RATINGS_TO_DO_PASSENGER_FAIL,
    payload: error,
  };
};

// Get driver's ratings to do

export const getRatingsToDoDriverRequested = () => {
  return {
    type: ratingTypes.GET_RATINGS_TO_DO_DRIVER_REQUEST,
  };
};

export const getRatingsToDoDriver = (userId, driverId) => {
  return (dispatch) => {
    dispatch(getRatingsToDoDriverRequested());

    axios
      .get(URL_API + "/rating/get-ratings-to-do-driver", {
        headers: authHeader(),
        params: {
          userId,
          driverId,
        },
      })
      .then((response) => {
        // console.log(response.data);

        dispatch(getRatingsToDoDriverSuccess(response.data));
      })
      .catch((error) => {
        // console.log(error);

        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch(getRatingsToDoDriverFail(message));
      });
  };
};

export const getRatingsToDoDriverSuccess = (data) => {
  return {
    type: ratingTypes.GET_RATINGS_TO_DO_DRIVER_SUCCESS,
    payload: data,
  };
};

export const getRatingsToDoDriverFail = (error) => {
  return {
    type: ratingTypes.GET_RATINGS_TO_DO_DRIVER_FAIL,
    payload: error,
  };
};

// Submit a rating form

export const submitRatingFormRequested = () => {
  return {
    type: ratingTypes.SUBMIT_RATING_FORM_REQUEST,
  };
};

export const submitRatingForm = (user, bookingId, note, comment) => {
  return (dispatch) => {
    dispatch(submitRatingFormRequested());

    const parsingResult = parseText(comment);

    if (parsingResult.value === 0) {
      axios
        .post(
          URL_API + "/rating/submit-rating-form",
          {
            userId: user.id,
            bookingId,
            note,
            comment,
          },
          {
            headers: authHeader(),
          }
        )
        .then((response) => {
          // console.log(response.data);

          dispatch(
            setToast({
              show: true,
              headerText: "Success",
              bodyText: t("translation:newRating.ratingReceived"),
              variant: "success",
            })
          );

          dispatch(getNotifications(user));
          dispatch(submitRatingFormSuccess(response.data));
        })
        .catch((error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          // console.log(error);
          dispatch(
            setToast({
              show: true,
              headerText: "Error",
              bodyText: message,
              variant: "danger",
            })
          );
          dispatch(submitRatingFormFail(message));
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

      dispatch(submitRatingFormFail(parsingResult.message));
    }
  };
};

export const submitRatingFormSuccess = (data) => {
  return {
    type: ratingTypes.SUBMIT_RATING_FORM_SUCCESS,
    payload: data,
  };
};

export const submitRatingFormFail = (error) => {
  return {
    type: ratingTypes.SUBMIT_RATING_FORM_FAIL,
    payload: error,
  };
};

// Get a driver's ratings

export const getDriverRatingsRequested = () => {
  return {
    type: ratingTypes.GET_DRIVER_RATINGS_REQUEST,
  };
};

export const getDriverRatings = (username) => {
  return (dispatch) => {
    dispatch(getDriverRatingsRequested());

    axios
      .get(URL_API + "/driver/" + username + "/ratings", {
        headers: authHeader(),
      })
      .then((response) => {
        // console.log(response.data);

        if (response.data) {
          dispatch(getDriverRatingsSuccess(response.data));
        } else {
          dispatch(getDriverRatingsFail("Error"));
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

        dispatch(getDriverRatingsFail(message));
      });
  };
};

export const getDriverRatingsSuccess = (data) => {
  return {
    type: ratingTypes.GET_DRIVER_RATINGS_SUCCESS,
    payload: data,
  };
};

export const getDriverRatingsFail = (error) => {
  return {
    type: ratingTypes.GET_DRIVER_RATINGS_FAIL,
    payload: error,
  };
};

// Get a passenger's ratings

export const getPassengerRatingsRequested = () => {
  return {
    type: ratingTypes.GET_PASSENGER_RATINGS_REQUEST,
  };
};

export const getPassengerRatings = (username) => {
  return (dispatch) => {
    dispatch(getPassengerRatingsRequested());

    axios
      .get(URL_API + "/passenger/" + username + "/ratings", {
        headers: authHeader(),
      })
      .then((response) => {
        // console.log(response.data);

        if (response.data) {
          dispatch(getPassengerRatingsSuccess(response.data));
        } else {
          dispatch(getPassengerRatingsFail("Error"));
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

        dispatch(getPassengerRatingsFail(message));
      });
  };
};

export const getPassengerRatingsSuccess = (data) => {
  return {
    type: ratingTypes.GET_PASSENGER_RATINGS_SUCCESS,
    payload: data,
  };
};

export const getPassengerRatingsFail = (error) => {
  return {
    type: ratingTypes.GET_PASSENGER_RATINGS_FAIL,
    payload: error,
  };
};
