import rideTypes from "./rideTypes";
import axios from "axios";
import { setfeedback, sendEmail } from "../index";
import * as Yup from "yup";
import { getNotifications } from "../../redux";

const URL_API = process.env.REACT_APP_URL_API;

// Get all the driver's ride

export const getDriverRidesRequested = () => {
  return {
    type: rideTypes.GET_USER_RIDES_REQUEST,
  };
};

export const getDriverRides = (userId) => {
  return (dispatch) => {
    dispatch(getDriverRidesRequested());

    axios
      .get(URL_API + "/ride/user-rides", {
        params: {
          userId,
        },
      })
      .then((response) => {
        // console.log(response.data);
        dispatch(getDriverRidesSuccess(response.data));
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
        dispatch(getDriverRidesFail(error));
      });
  };
};

export const getDriverRidesSuccess = (data) => {
  return {
    type: rideTypes.GET_USER_RIDES_SUCCESS,
    payload: data,
  };
};

export const getDriverRidesFail = (error) => {
  return {
    type: rideTypes.GET_USER_RIDES_FAIL,
    payload: error,
  };
};

// Submit the form to add a new ride

export const submitFormOfferRideRequested = () => {
  return {
    type: rideTypes.SUBMIT_FORM_OFFER_RIDE_REQUEST,
  };
};

export const submitFormOfferRide = (user, values) => {
  return (dispatch) => {
    values = {
      ...values,
      dateTime: new Date(`${values.date}T${values.time}`),
    };

    dispatch(submitFormOfferRideRequested());

    axios
      .post(URL_API + "/ride/add-ride", {
        userId: user.id,
        formValues: values,
      })
      .then((response) => {
        // console.log(response.message);

        dispatch(
          setfeedback({
            variant: "success",
            message: response.data.message,
          })
        );

        dispatch(getAllRides());
        dispatch(sendEmail("OFFER_RIDE", user, values));
        dispatch(submitFormOfferRideSuccess(response.data));
        dispatch(getDriverRides(user.id));
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
          seatsNeeded: Yup.number("Please select a number")
            .min(1, "Min. 1 passenger required")
            .max(
              response.data.seatsLeft,
              `Max. ${response.data.seatsLeft} passengers`
            )
            .required(),
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
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        // console.log(error);

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

// Get a single booking

export const getBookingRequested = () => {
  return {
    type: rideTypes.GET_BOOKING_REQUEST,
  };
};

export const getBooking = (rideId) => {
  return (dispatch) => {
    dispatch(getBookingRequested());

    axios
      .get(URL_API + "/booking/" + rideId)
      .then((response) => {
        // console.log(response.data);

        dispatch(getBookingSuccess(response.data));
      })
      .catch((error) => {
        // console.log(error);

        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch(getBookingFail(message));
      });
  };
};

export const getBookingSuccess = (data) => {
  return {
    type: rideTypes.GET_BOOKING_SUCCESS,
    payload: data,
  };
};

export const getBookingFail = (error) => {
  return {
    type: rideTypes.GET_BOOKING_FAIL,
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
        console.log(error);

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

export const submitFormBookRide = (user, ride, formValues) => {
  return (dispatch) => {
    dispatch(submitFormBookRideRequested());

    axios
      .post(URL_API + "/ride/book", {
        userId: user.id,
        rideId: ride.id,
        driverId: ride.DriverId,
        formValues,
      })
      .then((response) => {
        // console.log(response.data);

        dispatch(
          setfeedback({
            variant: "success",
            message: response.data.message,
          })
        );

        // Send a booking summary to the passenger
        dispatch(sendEmail("BOOK_RIDE_BY_USER", user, { formValues, ride }));

        // Notify the driver that a booking has been requested
        dispatch(
          sendEmail("BOOK_RIDE_TO_DRIVER", ride.Driver.User, {
            formValues,
            ride,
            passenger: user,
          })
        );

        // Refresh everything
        dispatch(getAllRides());
        dispatch(getUserBookingRide(user.id, ride.id));
        dispatch(getUserBookings(user.id));
        dispatch(submitFormBookRideSuccess(response));
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

// When the driver accept or refuse the booking

export const submitFormDriverResponseBookingRequested = () => {
  return {
    type: rideTypes.SUBMIT_FORM_DRIVER_RESPONSE_BOOKING_REQUEST,
  };
};

export const submitFormDriverResponseBooking = (
  driver,
  formValues,
  booking
) => {
  return (dispatch) => {
    dispatch(submitFormDriverResponseBookingRequested());

    axios
      .put(URL_API + "/booking/driver-response", { formValues })
      .then((response) => {
        // console.log(response.data);

        if (response.data.newStatus === 3) {
          // If ride accepted by driver
          dispatch(
            setfeedback({
              variant: "success",
              message: response.data.message,
            })
          );

          // Notify the driver for accepting the booking
          dispatch(
            sendEmail("ACCEPTED_BY_DRIVER", driver, {
              booking,
              formValues,
            })
          );

          // Notify the passenger that has the booking accepted
          dispatch(
            sendEmail("ACCEPTED_TO_USER", booking.User, {
              booking,
              formValues,
            })
          );
        } else if (response.data.newStatus === 4) {
          // If ride refused by driver

          dispatch(
            setfeedback({
              variant: "warning",
              message: response.data.message,
            })
          );

          // Notify the driver for refusing the booking
          dispatch(
            sendEmail("REFUSED_BY_DRIVER", driver, {
              booking,
              formValues,
            })
          );

          // Notify the passenger that has the booking refused
          dispatch(
            sendEmail("REFUSED_TO_USER", booking.User, {
              booking,
              formValues,
            })
          );
        }

        dispatch(submitFormDriverResponseBookingSuccess(response.data.message));
        dispatch(getAllRides());
        dispatch(getBooking(formValues.bookingId));
        dispatch(getNotifications(formValues.userId));
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        // console.log(message);

        dispatch(
          setfeedback({
            variant: "danger",
            message: message,
          })
        );

        dispatch(submitFormDriverResponseBookingFail(error));
      });
  };
};

export const submitFormDriverResponseBookingSuccess = (data) => {
  return {
    type: rideTypes.SUBMIT_FORM_DRIVER_RESPONSE_BOOKING_SUCCESS,
    payload: data,
  };
};

export const submitFormDriverResponseBookingFail = (error) => {
  return {
    type: rideTypes.SUBMIT_FORM_DRIVER_RESPONSE_BOOKING_FAIL,
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

        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch(getUserBookingRideFail(message));
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

export const getUserBookingsRequested = () => {
  return {
    type: rideTypes.GET_USER_BOOKINGS_REQUEST,
  };
};

export const getUserBookings = (userId) => {
  return (dispatch) => {
    dispatch(getUserBookingsRequested());

    axios
      .get(URL_API + "/ride/user-bookings", {
        params: {
          userId,
        },
      })
      .then((response) => {
        // console.log(response.data);
        dispatch(getUserBookingsSuccess(response.data));
      })
      .catch((error) => {
        // const message =
        //   (error.response &&
        //     error.response.data &&
        //     error.response.data.message) ||
        //   error.message ||
        //   error.toString();

        // console.log(message);

        dispatch(getUserBookingsFail(error));
      });
  };
};

export const getUserBookingsSuccess = (data) => {
  return {
    type: rideTypes.GET_USER_BOOKINGS_SUCCESS,
    payload: data,
  };
};

export const getUserBookingsFail = (error) => {
  return {
    type: rideTypes.GET_USER_BOOKINGS_FAIL,
    payload: error,
  };
};

// Get all the driver's rides requests

export const getDriverBookingsRequested = () => {
  return {
    type: rideTypes.GET_DRIVER_BOOKINGS_REQUEST,
  };
};

export const getDriverBookings = (userId) => {
  return (dispatch) => {
    dispatch(getDriverBookingsRequested());

    axios
      .get(URL_API + "/ride/driver-bookings", {
        params: {
          userId,
        },
      })
      .then((response) => {
        // console.log(response.data);
        dispatch(getDriverBookingsSuccess(response.data));
      })
      .catch((error) => {
        // console.log(error)
        dispatch(getDriverBookingsFail(error));
      });
  };
};

export const getDriverBookingsSuccess = (data) => {
  return {
    type: rideTypes.GET_DRIVER_BOOKINGS_SUCCESS,
    payload: data,
  };
};

export const getDriverBookingsFail = (error) => {
  return {
    type: rideTypes.GET_DRIVER_BOOKINGS_FAIL,
    payload: error,
  };
};

// Get all the booking from one user on the ride's page

export const getDriverBookingRideRequested = () => {
  return {
    type: rideTypes.GET_DRIVER_RIDE_BOOKING_REQUEST,
  };
};

export const getDriverBookingRide = (driverId, rideId) => {
  return (dispatch) => {
    dispatch(getDriverBookingRideRequested());

    axios
      .get(URL_API + "/ride/driver-booking-ride", {
        params: {
          driverId,
          rideId,
        },
      })
      .then((response) => {
        // console.log(response);

        dispatch(getDriverBookingRideSuccess(response.data));
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
          setfeedback({
            variant: "danger",
            message: message,
          })
        );

        dispatch(getDriverBookingRideFail(error));
      });
  };
};

export const getDriverBookingRideSuccess = (data) => {
  return {
    type: rideTypes.GET_DRIVER_RIDE_BOOKING_SUCCESS,
    payload: data,
  };
};

export const getDriverBookingRideFail = (error) => {
  return {
    type: rideTypes.GET_DRIVER_RIDE_BOOKING_FAIL,
    payload: error,
  };
};

// Get passengers details for a single ride

export const getPassengersDetailsRequested = () => {
  return {
    type: rideTypes.GET_PASSENGERS_DETAILS_REQUEST,
  };
};

export const getPassengersDetails = (rideId) => {
  return (dispatch) => {
    dispatch(getPassengersDetailsRequested());

    axios
      .get(URL_API + "/ride/passengers", {
        params: {
          rideId,
        },
      })
      .then((response) => {
        // console.log(response.data);
        dispatch(getPassengersDetailsSuccess(response.data));
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

        dispatch(getPassengersDetailsFail(error));
      });
  };
};

export const getPassengersDetailsSuccess = (data) => {
  return {
    type: rideTypes.GET_PASSENGERS_DETAILS_SUCCESS,
    payload: data,
  };
};

export const getPassengersDetailsFail = (error) => {
  return {
    type: rideTypes.GET_PASSENGERS_DETAILS_FAIL,
    payload: error,
  };
};
