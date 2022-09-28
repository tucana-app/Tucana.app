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
  submitBookingRideSuccess: false,
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

  isloadingSubmitFormConfirmRide: false,
  submitFormConfirmRideData: [],
  submitFormConfirmRideError: "",

  isloadingGetETA: false,
  getETAData: [],
  getETAError: "",

  formPublishRide: {
    origin: {
      city: "",
      province: "",
      address: "",
      latLng: { lat: 0, lng: 0 },
      details: {},
    },

    destination: {
      city: "",
      province: "",
      address: "",
      latLng: { lat: 0, lng: 0 },
      details: {},
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
      city: "",
      province: "",
      address: "",
      latLng: { lat: 0, lng: 0 },
      details: {},
    },

    destination: {
      city: "",
      province: "",
      address: "",
      latLng: { lat: 0, lng: 0 },
      details: {},
    },
    date: "",
    seats: 1,
  },

  isloadingDriverProfile: false,
  driverProfileData: {},
  driverProfileError: "",

  isloadingNbRidesOnline: false,
  nbRidesOnlineData: "-",
  nbRidesOnlineError: "",
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
        submitBookingRideSuccess: action.payload,
        submitBookingRideError: "",
      };

    case rideTypes.SUBMIT_FORM_BOOK_RIDE_FAIL:
      return {
        ...state,
        isloadingBookingRide: false,
        submitBookingRideSuccess: false,
        submitBookingRideError: action.payload,
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

    case rideTypes.GET_RIDES_TO_CONFIRM_REQUEST:
      return {
        ...state,
        isLoadingRidesToConfirm: true,
      };

    case rideTypes.GET_RIDES_TO_CONFIRM_SUCCESS:
      return {
        ...state,
        isLoadingRidesToConfirm: false,
        ridesToConfirmData: action.payload,
        ridesToConfirmError: "",
      };

    case rideTypes.GET_RIDES_TO_CONFIRM_FAIL:
      return {
        ...state,
        isLoadingRidesToConfirm: false,
        ridesToConfirmData: [],
        ridesToConfirmError: action.payload,
      };

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

    case rideTypes.SET_LOCATION:
      return {
        ...state,
        location: {
          city: action.payload.city,
          province: action.payload.province,
          address: action.payload.address,
          latLng: action.payload.latLng,
          details: action.payload.details,
        },
      };

    case rideTypes.RESET_SEARCH:
      return {
        ...state,
        location: {
          city: "",
          province: "",
          address: "",
          latLng: { lat: 0, lng: 0 },
          details: {},
        },
      };

    case rideTypes.SET_RIDE_ORIGIN:
      return {
        ...state,
        formPublishRide: {
          ...state.formPublishRide,
          origin: {
            city: action.payload.city,
            province: action.payload.province,
            address: action.payload.address,
            latLng: action.payload.latLng,
            details: action.payload.details,
          },
        },
      };

    case rideTypes.RESET_RIDE_ORIGIN:
      return {
        ...state,
        formPublishRide: {
          ...state.formPublishRide,
          origin: {
            city: "",
            province: "",
            address: "",
            latLng: { lat: 0, lng: 0 },
            details: {},
          },
        },
      };

    case rideTypes.SET_RIDE_DESTINATION:
      return {
        ...state,
        formPublishRide: {
          ...state.formPublishRide,
          destination: {
            city: action.payload.city,
            province: action.payload.province,
            address: action.payload.address,
            latLng: action.payload.latLng,
            details: action.payload.details,
          },
        },
      };

    case rideTypes.RESET_RIDE_DESTINATION:
      return {
        ...state,
        formPublishRide: {
          ...state.formPublishRide,
          destination: {
            city: "",
            province: "",
            address: "",
            latLng: { lat: 0, lng: 0 },
            details: {},
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
            city: "",
            province: "",
            address: "",
            latLng: { lat: 0, lng: 0 },
            details: {},
          },

          destination: {
            city: "",
            province: "",
            address: "",
            latLng: { lat: 0, lng: 0 },
            details: {},
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
            city: action.payload.city,
            province: action.payload.province,
            address: action.payload.address,
            latLng: action.payload.latLng,
            details: action.payload.details,
          },
        },
      };

    case rideTypes.RESET_SEARCH_ORIGIN:
      return {
        ...state,
        formSearchRide: {
          ...state.formSearchRide,
          origin: {
            city: "",
            province: "",
            address: "",
            latLng: { lat: 0, lng: 0 },
            details: {},
          },
        },
      };

    case rideTypes.SET_SEARCH_DESTINATION:
      return {
        ...state,
        formSearchRide: {
          ...state.formSearchRide,
          destination: {
            city: action.payload.city,
            province: action.payload.province,
            address: action.payload.address,
            latLng: action.payload.latLng,
            details: action.payload.details,
          },
        },
      };

    case rideTypes.RESET_SEARCH_DESTINATION:
      return {
        ...state,
        formSearchRide: {
          ...state.formSearchRide,
          destination: {
            city: "",
            province: "",
            address: "",
            latLng: { lat: 0, lng: 0 },
            details: {},
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

    // Get a driver's profile
    case rideTypes.GET_DRIVER_PROFILE_REQUEST:
      return {
        ...state,
        isloadingDriverProfile: true,
      };

    case rideTypes.GET_DRIVER_PROFILE_SUCCESS:
      return {
        ...state,
        isloadingDriverProfile: false,
        driverProfileData: action.payload,
        driverProfileError: "",
      };

    case rideTypes.GET_DRIVER_PROFILE_FAIL:
      return {
        ...state,
        isloadingDriverProfile: false,
        driverProfileData: {},
        driverProfileError: action.payload,
      };

    // Get the number of rides online
    case rideTypes.GET_NB_RIDES_ONLINE_REQUEST:
      return {
        ...state,
        isloadingNbRidesOnline: true,
      };

    case rideTypes.GET_NB_RIDES_ONLINE_SUCCESS:
      return {
        ...state,
        isloadingNbRidesOnline: false,
        nbRidesOnlineData: action.payload,
        nbRidesOnlineError: "",
      };

    case rideTypes.GET_NB_RIDES_ONLINE_FAIL:
      return {
        ...state,
        isloadingNbRidesOnline: false,
        nbRidesOnlineData: "-",
        nbRidesOnlineError: action.payload,
      };

    default:
      return state;
  }
}

export default rideReducer;
