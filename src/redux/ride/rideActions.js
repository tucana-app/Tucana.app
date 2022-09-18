import rideTypes from "./rideTypes";
import axios from "axios";
import { getNotifications, setToast } from "../index";
import { parseText } from "../../helpers";
import * as Yup from "yup";

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
          setToast({
            show: true,
            headerText: "Error",
            bodyText: message,
            variant: "danger",
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

// Form add new ride
// Set origin with Google Maps
export const setOfferOrigin = (origin) => {
  return (dispatch) => {
    dispatch({
      type: rideTypes.RESET_SEARCH,
    });

    dispatch({
      type: rideTypes.SET_RIDE_ORIGIN,
      payload: origin,
    });
  };
};

// Reset origin
export const resetOfferOrigin = () => {
  return (dispatch) => {
    dispatch({
      type: rideTypes.RESET_SEARCH,
    });

    dispatch({
      type: rideTypes.RESET_RIDE_ORIGIN,
    });
  };
};

// Set destination with Google Maps
export const setOfferDestination = (destination) => {
  return (dispatch) => {
    dispatch({
      type: rideTypes.RESET_SEARCH,
    });

    dispatch({
      type: rideTypes.SET_RIDE_DESTINATION,
      payload: destination,
    });
  };
};

// Reset origin
export const resetOfferDestination = () => {
  return (dispatch) => {
    dispatch({
      type: rideTypes.RESET_SEARCH,
    });

    dispatch({
      type: rideTypes.RESET_RIDE_DESTINATION,
    });
  };
};

// Set date
export const setRideDate = (date) => {
  return {
    type: rideTypes.SET_RIDE_DATE,
    payload: date,
  };
};

// Set time
export const setRideTime = (time) => {
  return {
    type: rideTypes.SET_RIDE_TIME,
    payload: time,
  };
};

// Set seats
export const setRideSeats = (seats) => {
  return {
    type: rideTypes.SET_RIDE_SEATS,
    payload: seats,
  };
};

// Set price
export const setRidePrice = (price) => {
  return {
    type: rideTypes.SET_RIDE_PRICE,
    payload: price,
  };
};

// Set comment
export const setRideComment = (comment) => {
  return {
    type: rideTypes.SET_RIDE_COMMENT,
    payload: comment,
  };
};

// Reset form
export const resetFormOfferRide = () => {
  return (dispatch) => {
    dispatch({
      type: rideTypes.RESET_SEARCH,
    });

    dispatch({
      type: rideTypes.RESET_FORM_OFFER_RIDE,
    });
  };
};

// Submit the form to add a new ride

export const getETARequested = () => {
  return {
    type: rideTypes.GET_ETA_REQUEST,
  };
};

export const getETA = (origin, destination) => {
  return (dispatch) => {
    dispatch(getETARequested());

    axios
      .get(URL_API + "/ride/get-eta", {
        params: {
          originLat: origin.latLng.lat,
          originLng: origin.latLng.lng,
          destinationLat: destination.latLng.lat,
          destinationLng: destination.latLng.lng,
        },
      })
      .then((response) => {
        // console.log(response.data);
        dispatch(getETASuccess(response.data));
      })
      .catch((error) => {
        // console.log(error)
        dispatch(getETAFail(error));
      });
  };
};

export const getETASuccess = (data) => {
  return {
    type: rideTypes.GET_ETA_SUCCESS,
    payload: data,
  };
};

export const getETAFail = (error) => {
  return {
    type: rideTypes.GET_ETA_FAIL,
    payload: error,
  };
};

// Submit the form to add a new ride

export const submitFormOfferRideRequested = () => {
  return {
    type: rideTypes.SUBMIT_FORM_OFFER_RIDE_REQUEST,
  };
};

export const submitFormOfferRide = (user, formOfferRide, ETAdata) => {
  return (dispatch) => {
    dispatch(submitFormOfferRideRequested());

    const parsingResult = parseText(formOfferRide.comment);

    // Formatting origin date & time
    const time = formOfferRide.time.value;
    const hours = time.slice(0, time.search(":"));
    const minutes = time.slice(time.search(":") + 1);
    var dateTimeOrigin = formOfferRide.date.setHours(hours);
    dateTimeOrigin = formOfferRide.date.setMinutes(minutes);
    dateTimeOrigin = new Date(dateTimeOrigin);

    // Formatting destination date & time
    var dateTimeDestination = new Date();
    dateTimeDestination.setTime(
      dateTimeOrigin.getTime() + ETAdata.durationValue * 1000
    );

    if (parsingResult.value === 0) {
      formOfferRide = {
        ...formOfferRide,
        dateTimeOrigin,
        dateTimeDestination,
        ETAdata,
      };

      axios
        .post(URL_API + "/ride/add-ride", {
          user,
          formOfferRide,
        })
        .then((response) => {
          // console.log(response.message);

          dispatch(
            setToast({
              show: true,
              headerText: "Success",
              bodyText: "Your ride is now online",
              variant: "success",
            })
          );

          dispatch(resetFormOfferRide());
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
            setToast({
              show: true,
              headerText: "Error",
              bodyText: message,
              variant: "danger",
            })
          );

          dispatch(submitFormOfferRideFail(error));
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

      dispatch(submitFormOfferRideFail(parsingResult.message));
    }
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

        if (response.data) {
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
        } else {
          dispatch(getRideFail("Ride not found"));
        }
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

        if (response.data) {
          dispatch(getBookingSuccess(response.data));
        } else {
          dispatch(getBookingFail("Booking not found"));
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

// Search a ride
// Set origin with Google Maps
export const setSearchOrigin = (origin) => {
  return (dispatch) => {
    dispatch({
      type: rideTypes.RESET_SEARCH,
    });

    dispatch({
      type: rideTypes.SET_SEARCH_ORIGIN,
      payload: origin,
    });
  };
};

// Reset origin
export const resetSearchOrigin = () => {
  return (dispatch) => {
    dispatch({
      type: rideTypes.RESET_SEARCH,
    });

    dispatch({
      type: rideTypes.RESET_SEARCH_ORIGIN,
    });
  };
};

// Set destination with Google Maps
export const setSearchDestination = (destination) => {
  return (dispatch) => {
    dispatch({
      type: rideTypes.RESET_SEARCH,
    });

    dispatch({
      type: rideTypes.SET_SEARCH_DESTINATION,
      payload: destination,
    });
  };
};

// Reset destination
export const resetSearchDestination = () => {
  return (dispatch) => {
    dispatch({
      type: rideTypes.RESET_SEARCH,
    });

    dispatch({
      type: rideTypes.RESET_SEARCH_DESTINATION,
    });
  };
};

// Set search date
export const setSearchDate = (date) => {
  return {
    type: rideTypes.SET_SEARCH_DATE,
    payload: date,
  };
};

// Set search date
export const setSearchSeats = (seats) => {
  return {
    type: rideTypes.SET_SEARCH_SEATS,
    payload: seats,
  };
};

// Get all the driver's ride from a user

export const getFilteredRidesRequested = () => {
  return {
    type: rideTypes.GET_FILTERED_RIDES_REQUEST,
  };
};

export const getFilteredRides = (origin, destination, date) => {
  return (dispatch) => {
    dispatch(getFilteredRidesRequested());

    // Convert the date withouth the Timezone
    const convertedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    axios
      .get(URL_API + "/ride/filtered-rides", {
        params: {
          originProvince: origin.province,
          originLat: origin.latLng.lat,
          originLng: origin.latLng.lng,
          destinationProvince: destination.province,
          destinationLat: destination.latLng.lat,
          destinationLng: destination.latLng.lng,
          date: convertedDate,
        },
      })
      .then((response) => {
        // console.log(response);
        dispatch(getFilteredRidesSuccess(response.data));
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

        dispatch(getFilteredRidesFail(error));
      });
  };
};

export const getFilteredRidesSuccess = (data) => {
  return {
    type: rideTypes.GET_FILTERED_RIDES_SUCCESS,
    payload: data,
  };
};

export const getFilteredRidesFail = (error) => {
  return {
    type: rideTypes.GET_FILTERED_RIDES_FAIL,
    payload: error,
  };
};

export const showSearchForm = () => {
  return {
    type: rideTypes.RESET_SEARCH_FORM,
  };
};

//

export const submitFormBookRideRequested = () => {
  return {
    type: rideTypes.SUBMIT_FORM_BOOK_RIDE_REQUEST,
  };
};

export const submitFormBookRide = (
  user,
  ride,
  seats,
  totalPaidPassenger,
  totalReceivedDriver
) => {
  return (dispatch) => {
    dispatch(submitFormBookRideRequested());

    axios
      .post(URL_API + "/ride/book", {
        passenger: user,
        ride,
        seats,
        totalPaidPassenger,
        totalReceivedDriver,
      })
      .then((response) => {
        // console.log(response.data);

        dispatch(
          setToast({
            show: true,
            headerText: "Success",
            bodyText: "Your booking has been submitted to the driver",
            variant: "success",
          })
        );

        // Refresh everything
        dispatch(getUserBookingRide(user.id, ride.id));
        dispatch(getUserBookings(user.id));
        dispatch(submitFormBookRideSuccess(response.data));
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

export const submitFormDriverResponseBooking = (formValues, booking) => {
  return (dispatch) => {
    dispatch(submitFormDriverResponseBookingRequested());

    const parsingResult = parseText(formValues.comment);

    if (parsingResult.value === 0) {
      axios
        .put(URL_API + "/booking/driver-response", { booking, formValues })
        .then((response) => {
          // console.log(response.data);

          if (response.data.newStatus === 3) {
            dispatch(
              setToast({
                show: true,
                headerText: "Success",
                bodyText: "You have accepted the booking",
                variant: "success",
              })
            );
          } else if (response.data.newStatus === 4) {
            // If ride refused by driver

            dispatch(
              setToast({
                show: true,
                headerText: "Warning",
                bodyText: response.data.message,
                variant: "warning",
              })
            );
          }

          dispatch(
            submitFormDriverResponseBookingSuccess(response.data.message)
          );
          dispatch(getBooking(formValues.bookingId));
          dispatch(getNotifications(formValues.userId));
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

          dispatch(submitFormDriverResponseBookingFail(error));
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

      dispatch(submitFormDriverResponseBookingFail(parsingResult.message));
    }
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

// Get all the passenger's rides bookings

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
          setToast({
            show: true,
            headerText: "Error",
            bodyText: message,
            variant: "danger",
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
          setToast({
            show: true,
            headerText: "Error",
            bodyText: message,
            variant: "danger",
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

// Get all the rides that the user has to provide
// a feedback whether the ride happened of not

export const getRidesToConfirmRequested = () => {
  return {
    type: rideTypes.GET_RIDES_TO_CONFIRM_REQUEST,
  };
};

export const getRidesToConfirm = (userId) => {
  return (dispatch) => {
    dispatch(getRidesToConfirmRequested());

    axios
      .get(URL_API + "/ride/rides-to-confirm", {
        params: {
          userId,
        },
      })
      .then((response) => {
        // console.log(response.data);
        dispatch(getRidesToConfirmSuccess(response.data));
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

        dispatch(getRidesToConfirmFail(error));
      });
  };
};

export const getRidesToConfirmSuccess = (data) => {
  return {
    type: rideTypes.GET_RIDES_TO_CONFIRM_SUCCESS,
    payload: data,
  };
};

export const getRidesToConfirmFail = (error) => {
  return {
    type: rideTypes.GET_RIDES_TO_CONFIRM_FAIL,
    payload: error,
  };
};

// Submit the form to confirm a ride

export const submitFormConfirmRideRequested = () => {
  return {
    type: rideTypes.SUBMIT_FORM_CONFIRM_RIDE_REQUEST,
  };
};

export const submitFormConfirmRide = (user, ride, isConfirmed) => {
  return (dispatch) => {
    dispatch(submitFormConfirmRideRequested());

    axios
      .post(URL_API + "/ride/form-confirm-ride", {
        user,
        ride,
        isConfirmed,
      })
      .then((response) => {
        // console.log(response.message);

        if (isConfirmed) {
          dispatch(
            setToast({
              show: true,
              headerText: "Success",
              bodyText: "You have confirmed the ride",
              variant: "success",
            })
          );
        } else {
          dispatch(
            setToast({
              show: true,
              headerText: "Success",
              bodyText: "You have rejected the ride",
              variant: "warning",
            })
          );
        }

        dispatch(submitFormConfirmRideSuccess(response.data));
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch(submitFormConfirmRideFail(message));
      });
  };
};

export const submitFormConfirmRideSuccess = (data) => {
  return {
    type: rideTypes.SUBMIT_FORM_CONFIRM_RIDE_SUCCESS,
    payload: data,
  };
};

export const submitFormConfirmRideFail = (error) => {
  return {
    type: rideTypes.SUBMIT_FORM_CONFIRM_RIDE_FAIL,
    payload: error,
  };
};

// Set location with Google Maps
export const setLocation = (location) => {
  return {
    type: rideTypes.SET_LOCATION,
    payload: location,
  };
};

// Reset search
export const resetSearch = () => {
  return {
    type: rideTypes.RESET_SEARCH,
  };
};

// Get a driver's profile

export const getDriverProfileRequested = () => {
  return {
    type: rideTypes.GET_DRIVER_PROFILE_REQUEST,
  };
};

export const getDriverProfile = (username) => {
  return (dispatch) => {
    dispatch(getDriverProfileRequested());

    axios
      .get(URL_API + "/driver/" + username)
      .then((response) => {
        // console.log(response.data);

        if (response.data) {
          dispatch(getDriverProfileSuccess(response.data));
        } else {
          dispatch(getDriverProfileFail("Booking not found"));
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

        dispatch(getDriverProfileFail(message));
      });
  };
};

export const getDriverProfileSuccess = (data) => {
  return {
    type: rideTypes.GET_DRIVER_PROFILE_SUCCESS,
    payload: data,
  };
};

export const getDriverProfileFail = (error) => {
  return {
    type: rideTypes.GET_DRIVER_PROFILE_FAIL,
    payload: error,
  };
};
