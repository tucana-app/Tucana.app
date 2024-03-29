import rideTypes from "./rideTypes";

const initialState = {
  isLoadingDriverRides: false,
  driverRidesData: [],
  driverRidesError: "",

  isLoadingSubmitFormPublishRide: false,
  submitFormPublishRideData: false,
  submitFormPublishRideError: "",

  isLoadingRide: false,
  rideData: {},
  rideError: "",

  isloadingBooking: false,
  bookingData: {},
  bookingError: "",

  isloadingFilteredRides: false,
  filteredRidesData: [],
  filteredRidesError: "",

  isloadingBookingRide: false,
  submitBookingRideData: {},
  submitBookingRideError: "",

  isloadingSubmitFormDriverResponseBooking: false,
  submitFormDriverResponseBookingSuccess: [],
  submitFormDriverResponseBookingError: "",

  isloadingUserRideBookings: false,
  userRideBookingsData: [],
  userRideBookingsError: "",

  isloadingDriverRideBookings: false,
  driverRideBookingsData: [],
  driverRideBookingsError: "",

  isLoadingUserBookings: false,
  userBookingsData: [],
  userBookingsError: "",

  isLoadingDriverBookings: false,
  driverBookingsData: [],
  driverBookingsError: "",

  isLoadingPassengersDetails: false,
  passengersDetailsData: [],
  passengersDetailsError: "",

  isLoadingRidesToConfirm: false,
  ridesToConfirmData: [],
  ridesToConfirmError: "",

  isLoadingRideToConfirm: false,
  rideToConfirmData: {},
  rideToConfirmError: "",

  isloadingSubmitFormConfirmRide: false,
  submitFormConfirmRideData: [],
  submitFormConfirmRideError: "",

  isloadingGetETA: false,
  getETAData: [],
  getETAError: "",

  formPublishRide: {
    origin: {
      placeName: "",
      placeDetails: "",
      province: "",
      country: "",
      address: "",
      latLng: { lat: 0, lng: 0 },
      locationObject: {},
    },

    destination: {
      placeName: "",
      placeDetails: "",
      province: "",
      country: "",
      address: "",
      latLng: { lat: 0, lng: 0 },
      locationObject: {},
    },
    date: "",
    time: "",
    seats: 1,
    price: 2000,
    comment: "",
  },

  isFormSearchRideSubmitted: false,

  formSearchRide: {
    origin: {
      placeName: "",
      placeDetails: "",
      province: "",
      country: "",
      address: "",
      latLng: { lat: 0, lng: 0 },
      locationObject: {},
    },

    destination: {
      placeName: "",
      placeDetails: "",
      province: "",
      country: "",
      address: "",
      latLng: { lat: 0, lng: 0 },
      locationObject: {},
    },
    date: "",
    seats: 1,
  },

  isloadingRidesOnline: false,
  ridesOnlineData: "-",
  ridesOnlineError: "",

  isloadingCancelRide: false,
  cancelRideSuccess: {},
  cancelRideFail: "",
};

function rideReducer(state = initialState, action) {
  switch (action.type) {
    case rideTypes.GET_USER_RIDES_REQUEST:
      return {
        ...state,
        isLoadingDriverRides: true,
      };

    case rideTypes.GET_USER_RIDES_SUCCESS:
      return {
        ...state,
        isLoadingDriverRides: false,
        driverRidesData: action.payload,
        totalRidesDriverOnGoing: action.payload.length,
        driverRidesError: "",
      };

    case rideTypes.GET_USER_RIDES_FAIL:
      return {
        ...state,
        isLoadingDriverRides: false,
        driverRidesData: [],
        driverRidesError: action.payload,
      };

    case rideTypes.GET_ETA_REQUEST:
      return {
        ...state,
        isloadingGetETA: true,
      };

    case rideTypes.GET_ETA_SUCCESS:
      return {
        ...state,
        isloadingGetETA: false,
        getETAData: action.payload,
        getETAError: "",
      };

    case rideTypes.GET_ETA_FAIL:
      return {
        ...state,
        isloadingGetETA: false,
        getETAData: [],
        getETAError: action.payload,
      };

    case rideTypes.SUBMIT_FORM_PUBLISH_RIDE_REQUEST:
      return {
        ...state,
        isLoadingSubmitFormPublishRide: true,
      };

    case rideTypes.SUBMIT_FORM_PUBLISH_RIDE_SUCCESS:
      return {
        ...state,
        isLoadingSubmitFormPublishRide: false,
        submitFormPublishRideData: action.payload,
        submitFormPublishRideError: "",
      };

    case rideTypes.SUBMIT_FORM_PUBLISH_RIDE_FAIL:
      return {
        ...state,
        isLoadingSubmitFormPublishRide: false,
        submitFormPublishRideData: false,
        submitFormPublishRideError: action.payload,
      };

    case rideTypes.GET_RIDE_REQUEST:
      return {
        ...state,
        isLoadingRide: true,
      };

    case rideTypes.GET_RIDE_SUCCESS:
      return {
        ...state,
        isLoadingRide: false,
        rideData: action.payload,
        rideError: "",
      };

    case rideTypes.GET_RIDE_FAIL:
      return {
        ...state,
        isLoadingRide: false,
        rideData: {},
        rideError: action.payload,
      };

    case rideTypes.GET_BOOKING_REQUEST:
      return {
        ...state,
        isloadingBooking: true,
      };

    case rideTypes.GET_BOOKING_SUCCESS:
      return {
        ...state,
        isloadingBooking: false,
        bookingData: action.payload,
        bookingError: "",
      };

    case rideTypes.GET_BOOKING_FAIL:
      return {
        ...state,
        isloadingBooking: false,
        bookingData: [],
        bookingError: action.payload,
      };

    case rideTypes.GET_FILTERED_RIDES_REQUEST:
      return {
        ...state,
        isloadingFilteredRides: true,
        isFormSearchRideSubmitted: true,
      };

    case rideTypes.GET_FILTERED_RIDES_SUCCESS:
      return {
        ...state,
        isloadingFilteredRides: false,
        filteredRidesData: action.payload,
        filteredRidesError: "",
      };

    case rideTypes.GET_FILTERED_RIDES_FAIL:
      return {
        ...state,
        isloadingFilteredRides: false,
        filteredRidesData: [],
        filteredRidesError: action.payload,
      };

    case rideTypes.RESET_SEARCH_FORM:
      return {
        ...state,
        isFormSearchRideSubmitted: false,
      };

    case rideTypes.SUBMIT_FORM_BOOK_RIDE_REQUEST:
      return {
        ...state,
        isloadingBookingRide: true,
      };

    case rideTypes.SUBMIT_FORM_BOOK_RIDE_SUCCESS:
      return {
        ...state,
        isloadingBookingRide: false,
        submitBookingRideData: action.payload,
        submitBookingRideError: "",
      };

    case rideTypes.SUBMIT_FORM_BOOK_RIDE_FAIL:
      return {
        ...state,
        isloadingBookingRide: false,
        submitBookingRideData: {},
        submitBookingRideError: action.payload,
      };

    case rideTypes.RESET_BOOK_RIDE:
      return {
        ...state,
        isloadingBookingRide: false,
        submitBookingRideData: {
          ...state.submitBookingRideData,
          flag: "",
        },
      };

    case rideTypes.SUBMIT_FORM_DRIVER_RESPONSE_BOOKING_REQUEST:
      return {
        ...state,
        isloadingSubmitFormDriverResponseBooking: true,
      };

    case rideTypes.SUBMIT_FORM_DRIVER_RESPONSE_BOOKING_SUCCESS:
      return {
        ...state,
        isloadingSubmitFormDriverResponseBooking: false,
        submitFormDriverResponseBookingSuccess: action.payload,
        submitFormDriverResponseBookingError: "",
      };

    case rideTypes.SUBMIT_FORM_DRIVER_RESPONSE_BOOKING_FAIL:
      return {
        ...state,
        isloadingSubmitFormDriverResponseBooking: false,
        submitFormDriverResponseBookingSuccess: false,
        submitFormDriverResponseBookingError: action.payload,
      };

    case rideTypes.GET_USER_RIDE_BOOKING_REQUEST:
      return {
        ...state,
        isloadingUserRideBookings: true,
      };

    case rideTypes.GET_USER_RIDE_BOOKING_SUCCESS:
      return {
        ...state,
        isloadingUserRideBookings: false,
        userRideBookingsData: action.payload,
        userRideBookingsError: "",
      };

    case rideTypes.GET_USER_RIDE_BOOKING_FAIL:
      return {
        ...state,
        isloadingUserRideBookings: false,
        userRideBookingsData: [],
        userRideBookingsError: action.payload,
      };

    case rideTypes.GET_DRIVER_RIDE_BOOKING_REQUEST:
      return {
        ...state,
        isloadingDriverRideBookings: true,
      };

    case rideTypes.GET_DRIVER_RIDE_BOOKING_SUCCESS:
      return {
        ...state,
        isloadingDriverRideBookings: false,
        driverRideBookingsData: action.payload,
        driverRideBookingsError: "",
      };

    case rideTypes.GET_DRIVER_RIDE_BOOKING_FAIL:
      return {
        ...state,
        isloadingDriverRideBookings: false,
        driverRideBookingsData: [],
        driverRideBookingsError: action.payload,
      };

    case rideTypes.GET_USER_BOOKINGS_REQUEST:
      return {
        ...state,
        isLoadingUserBookings: true,
      };

    case rideTypes.GET_USER_BOOKINGS_SUCCESS:
      return {
        ...state,
        isLoadingUserBookings: false,
        userBookingsData: action.payload,
        userBookingsError: "",
      };

    case rideTypes.GET_USER_BOOKINGS_FAIL:
      return {
        ...state,
        isLoadingUserBookings: false,
        userBookingsData: [],
        userBookingsError: action.payload,
      };

    case rideTypes.GET_DRIVER_BOOKINGS_REQUEST:
      return {
        ...state,
        isLoadingDriverBookings: true,
      };

    case rideTypes.GET_DRIVER_BOOKINGS_SUCCESS:
      return {
        ...state,
        isLoadingDriverBookings: false,
        driverBookingsData: action.payload,
        driverBookingsError: "",
      };

    case rideTypes.GET_DRIVER_BOOKINGS_FAIL:
      return {
        ...state,
        isLoadingDriverBookings: false,
        driverBookingsData: [],
        driverBookingsError: action.payload,
      };

    case rideTypes.GET_PASSENGERS_DETAILS_REQUEST:
      return {
        ...state,
        isLoadingPassengersDetails: true,
      };

    case rideTypes.GET_PASSENGERS_DETAILS_SUCCESS:
      return {
        ...state,
        isLoadingPassengersDetails: false,
        passengersDetailsData: action.payload,
        passengersDetailsError: "",
      };

    case rideTypes.GET_PASSENGERS_DETAILS_FAIL:
      return {
        ...state,
        isLoadingPassengersDetails: false,
        passengersDetailsData: [],
        passengersDetailsError: action.payload,
      };

    case rideTypes.RIDES_TO_CONFIRM_REQUEST:
      return {
        ...state,
        isLoadingRidesToConfirm: true,
      };

    case rideTypes.RIDES_TO_CONFIRM_SUCCESS:
      return {
        ...state,
        isLoadingRidesToConfirm: false,
        ridesToConfirmData: action.payload,
        ridesToConfirmError: "",
      };

    case rideTypes.RIDES_TO_CONFIRM_FAIL:
      return {
        ...state,
        isLoadingRidesToConfirm: false,
        ridesToConfirmData: [],
        ridesToConfirmError: action.payload,
      };

    // Get a single ride to confirm
    case rideTypes.RIDE_TO_CONFIRM_REQUEST:
      return {
        ...state,
        isLoadingRideToConfirm: true,
      };

    case rideTypes.RIDE_TO_CONFIRM_SUCCESS:
      return {
        ...state,
        isLoadingRideToConfirm: false,
        rideToConfirmData: action.payload,
        rideToConfirmError: "",
      };

    case rideTypes.RIDE_TO_CONFIRM_FAIL:
      return {
        ...state,
        isLoadingRideToConfirm: false,
        rideToConfirmData: {},
        rideToConfirmError: action.payload,
      };

    //
    case rideTypes.SUBMIT_FORM_CONFIRM_RIDE_REQUEST:
      return {
        ...state,
        isloadingSubmitFormConfirmRide: true,
      };

    case rideTypes.SUBMIT_FORM_CONFIRM_RIDE_SUCCESS:
      return {
        ...state,
        isloadingSubmitFormConfirmRide: false,
        submitFormConfirmRideData: action.payload,
        submitFormConfirmRideError: "",
      };

    case rideTypes.SUBMIT_FORM_CONFIRM_RIDE_FAIL:
      return {
        ...state,
        isloadingSubmitFormConfirmRide: false,
        submitFormConfirmRideData: [],
        submitFormConfirmRideError: action.payload,
      };

    case rideTypes.SET_RIDE_ORIGIN:
      return {
        ...state,
        formPublishRide: {
          ...state.formPublishRide,
          origin: {
            placeName: action.payload.placeName,
            placeDetails: action.payload.placeDetails,
            province: action.payload.province,
            country: action.payload.country,
            address: action.payload.address,
            latLng: action.payload.latLng,
            locationObject: action.payload.locationObject,
          },
        },
      };

    case rideTypes.RESET_RIDE_ORIGIN:
      return {
        ...state,
        formPublishRide: {
          ...state.formPublishRide,
          origin: {
            placeName: "",
            placeDetails: "",
            province: "",
            country: "",
            address: "",
            latLng: { lat: 0, lng: 0 },
            locationObject: {},
          },
        },
      };

    case rideTypes.SET_RIDE_DESTINATION:
      return {
        ...state,
        formPublishRide: {
          ...state.formPublishRide,
          destination: {
            placeName: action.payload.placeName,
            placeDetails: action.payload.placeDetails,
            province: action.payload.province,
            country: action.payload.country,
            address: action.payload.address,
            latLng: action.payload.latLng,
            locationObject: action.payload.locationObject,
          },
        },
      };

    case rideTypes.RESET_RIDE_DESTINATION:
      return {
        ...state,
        formPublishRide: {
          ...state.formPublishRide,
          destination: {
            placeName: "",
            placeDetails: "",
            province: "",
            country: "",
            address: "",
            latLng: { lat: 0, lng: 0 },
            locationObject: {},
          },
        },
      };

    case rideTypes.SET_RIDE_DATE:
      return {
        ...state,
        formPublishRide: {
          ...state.formPublishRide,
          date: action.payload,
        },
      };

    case rideTypes.SET_RIDE_TIME:
      return {
        ...state,
        formPublishRide: {
          ...state.formPublishRide,
          time: action.payload,
        },
      };

    case rideTypes.SET_RIDE_SEATS:
      return {
        ...state,
        formPublishRide: {
          ...state.formPublishRide,
          seats: action.payload,
        },
      };

    case rideTypes.SET_RIDE_PRICE:
      return {
        ...state,
        formPublishRide: {
          ...state.formPublishRide,
          price: action.payload,
        },
      };

    case rideTypes.SET_RIDE_COMMENT:
      return {
        ...state,
        formPublishRide: {
          ...state.formPublishRide,
          comment: action.payload,
        },
      };

    case rideTypes.RESET_FORM_PUBLISH_RIDE:
      return {
        ...state,
        formPublishRide: {
          origin: {
            placeName: "",
            placeDetails: "",
            province: "",
            country: "",
            address: "",
            latLng: { lat: 0, lng: 0 },
            locationObject: {},
          },

          destination: {
            placeName: "",
            placeDetails: "",
            province: "",
            country: "",
            address: "",
            latLng: { lat: 0, lng: 0 },
            locationObject: {},
          },
          date: "",
          time: "",
          seats: 1,
          price: 500,
          comment: "",
        },
      };

    // Search a ride

    case rideTypes.SET_SEARCH_ORIGIN:
      return {
        ...state,
        formSearchRide: {
          ...state.formSearchRide,
          origin: {
            placeName: action.payload.placeName,
            placeDetails: action.payload.placeDetails,
            province: action.payload.province,
            country: action.payload.country,
            address: action.payload.address,
            latLng: action.payload.latLng,
            locationObject: action.payload.locationObject,
          },
        },
      };

    case rideTypes.RESET_SEARCH_ORIGIN:
      return {
        ...state,
        formSearchRide: {
          ...state.formSearchRide,
          origin: {
            placeName: "",
            placeDetails: "",
            province: "",
            country: "",
            address: "",
            latLng: { lat: 0, lng: 0 },
            locationObject: {},
          },
        },
      };

    case rideTypes.SET_SEARCH_DESTINATION:
      return {
        ...state,
        formSearchRide: {
          ...state.formSearchRide,
          destination: {
            placeName: action.payload.placeName,
            placeDetails: action.payload.placeDetails,
            province: action.payload.province,
            country: action.payload.country,
            address: action.payload.address,
            latLng: action.payload.latLng,
            locationObject: action.payload.locationObject,
          },
        },
      };

    case rideTypes.RESET_SEARCH_DESTINATION:
      return {
        ...state,
        formSearchRide: {
          ...state.formSearchRide,
          destination: {
            placeName: "",
            placeDetails: "",
            province: "",
            country: "",
            address: "",
            latLng: { lat: 0, lng: 0 },
            locationObject: {},
          },
        },
      };

    case rideTypes.SET_SEARCH_DATE:
      return {
        ...state,
        formSearchRide: {
          ...state.formSearchRide,
          date: action.payload,
        },
      };

    case rideTypes.SET_SEARCH_SEATS:
      return {
        ...state,
        formSearchRide: {
          ...state.formSearchRide,
          seats: action.payload,
        },
      };

    // Get the number of rides online
    case rideTypes.GET_RIDES_ONLINE_REQUEST:
      return {
        ...state,
        isloadingRidesOnline: true,
      };

    case rideTypes.GET_RIDES_ONLINE_SUCCESS:
      return {
        ...state,
        isloadingRidesOnline: false,
        ridesOnlineData: action.payload,
        ridesOnlineError: "",
      };

    case rideTypes.GET_RIDES_ONLINE_FAIL:
      return {
        ...state,
        isloadingRidesOnline: false,
        ridesOnlineData: "",
        ridesOnlineError: action.payload,
      };

    // Cancel a ride
    case rideTypes.CANCEL_RIDE_REQUEST:
      return {
        ...state,
        isloadingCancelRide: true,
      };

    case rideTypes.CANCEL_RIDE_SUCCESS:
      return {
        ...state,
        isloadingCancelRide: false,
        cancelRideSuccess: action.payload,
        cancelRideFail: "",
      };

    case rideTypes.CANCEL_RIDE_FAIL:
      return {
        ...state,
        isloadingCancelRide: false,
        cancelRideSuccess: {},
        cancelRideFail: action.payload,
      };

    case rideTypes.RESET_CANCEL_RIDE:
      return {
        ...state,
        isloadingCancelRide: false,
        cancelRideSuccess: {},
      };

    default:
      return state;
  }
}

export default rideReducer;
