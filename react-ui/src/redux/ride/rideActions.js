import rideTypes from "./rideTypes";
import axios from "axios";
import { setfeedback } from "../index";
import * as Yup from "yup";

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
        // console.log(response.data);
        dispatch(getUserDriverRidesSuccess(response.data));
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
          setfeedback({
            variant: "danger",
            message: message,
          })
        );
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
      dateTime: new Date(`${values.date}T${values.time}`),
    };

    dispatch(submitFormOfferRideRequested());

    axios
      .post(URL_API + "/ride/add-ride", {
        userId,
        formValues: values,
      })
      .then((response) => {
        // console.log(response.message);

        dispatch(
          setfeedback({
            variant: "success",
            message: response.data,
          })
        );

        dispatch(submitFormOfferRideSuccess(response.data));
        dispatch(getUserDriverRides(userId));
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
            message,
          })
        );

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

// Get a single ride

export const getRideRequested = () => {
  return {
    type: rideTypes.GET_RIDE_REQUEST,
  };
};

export const getRide = (rideId) => {
  return (dispatch) => {
    dispatch(getRideRequested());

    axios
      .get(URL_API + "/ride/" + rideId)
      .then((response) => {
        // console.log(response);

        // const { labelStringField, labelRequiredField } = useSelector(
        //   (state) => state.global
        // );

        // Render the list of option for the number of seats available
        const optionsSeatsNeeded = [];

        for (let i = 1; i <= response.data.seatsLeft; i++) {
          optionsSeatsNeeded.push(
            <option key={i} value={i}>
              {i}
            </option>
          );
        }

        const schema = Yup.object().shape({
          seatsNeeded: Yup.number("dsdas")
            .min(1, "Min. 1 passenger required")
            .max(
              response.data.seatsLeft,
              `Max. ${response.data.seatsLeft} passengers`
            )
            .required("NOP"),
          comment: Yup.string("labelStringField"),
        });

        dispatch(
          getRideSuccess({
            ride: response.data,
            optionsSeatsNeeded,
            schema,
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

        dispatch(getRideFail(message));
      });
  };
};

export const getRideSuccess = (data) => {
  return {
    type: rideTypes.GET_RIDE_SUCCESS,
    payload: data,
  };
};

export const getRideFail = (error) => {
  return {
    type: rideTypes.GET_RIDE_FAIL,
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
        // console.log(error.message);

        // const message =
        //   (error.response &&
        //     error.response.data &&
        //     error.response.data.message) ||
        //   error.message ||
        //   error.toString();

        dispatch(
          setfeedback({
            variant: "danger",
            message: error.message,
          })
        );

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
        // console.log(response);

        dispatch(
          setfeedback({
            variant: "success",
            message: response.data,
          })
        );

        dispatch(submitFormBookRideSuccess(response));
        dispatch(getAllRides());
        dispatch(getUserBookingRide(userId, rideId));
        dispatch(getDriverRidesRequests(userId));
      })
      .catch((error) => {
        // console.log(error);

        // const message =
        //   (error.response &&
        //     error.response.data &&
        //     error.response.data.message) ||
        //   error.message ||
        //   error.toString();

        dispatch(
          setfeedback({
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

        // const message =
        //   (error.response &&
        //     error.response.data &&
        //     error.response.data.message) ||
        //   error.message ||
        //   error.toString();

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

// Get all the driver's rides requests

export const getDriverRidesRequestsRequested = () => {
  return {
    type: rideTypes.GET_DRIVER_RIDES_REQUESTS_REQUEST,
  };
};

export const getDriverRidesRequests = (userId) => {
  return (dispatch) => {
    dispatch(getDriverRidesRequestsRequested());

    axios
      .get(URL_API + "/ride/driver-all-rides-requests", {
        params: {
          userId,
        },
      })
      .then((response) => {
        // console.log(response.data);
        dispatch(getDriverRidesRequestsSuccess(response.data));
      })
      .catch((error) => {
        // console.log(error)
        dispatch(getDriverRidesRequestsFail(error));
      });
  };
};

export const getDriverRidesRequestsSuccess = (data) => {
  return {
    type: rideTypes.GET_DRIVER_RIDES_REQUESTS_SUCCESS,
    payload: data,
  };
};

export const getDriverRidesRequestsFail = (error) => {
  return {
    type: rideTypes.GET_DRIVER_RIDES_REQUESTS_FAIL,
    payload: error,
  };
};
