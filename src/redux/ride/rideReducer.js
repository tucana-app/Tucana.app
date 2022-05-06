import rideTypes from "./rideTypes";

const initialState = {
  isLoadingDriverRides: false,
  driverRidesData: [],
  driverRidesError: "",

  isLoadingSubmitFormOfferRide: false,
  submitFormOfferRideSuccess: false,
  submitFormOfferRideFail: "",

  isloadingRide: false,
  rideData: [],
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

  isloadingUserRideBookingList: false,
  userRideBookingData: [],
  userRideBookingError: "",

  isloadingDriverRideBookingList: false,
  driverRideBookingData: [],
  driverRideBookingError: "",

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
  ridesToFeedbackError: "",

  isloadingSubmitFormConfirmRide: false,
  submitFormConfirmRideData: [],
  submitFormConfirmRideError: "",

  isFormSearchRideSubmitted: false,

  searchAddress: "",

  location: {
    city: "",
    province: "",
    address: "",
    latLng: { lat: 0, lng: 0 },
    details: {},
  },

  formOfferRide: {
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
    seats: 0,
    comment: "",
  },

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
  },
};

const rideReducer = (state = initialState, action) => {
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

    case rideTypes.SUBMIT_FORM_OFFER_RIDE_REQUEST:
      return {
        ...state,
        isLoadingSubmitFormOfferRide: true,
        submitBookingRideSuccess: false,
        submitBookingRideError: "",
      };

    case rideTypes.SUBMIT_FORM_OFFER_RIDE_SUCCESS:
      return {
        ...state,
        isLoadingSubmitFormOfferRide: false,
        submitFormOfferRideSuccess: true,
        submitFormOfferRideFail: "",
      };

    case rideTypes.SUBMIT_FORM_OFFER_RIDE_FAIL:
      return {
        ...state,
        isLoadingSubmitFormOfferRide: false,
        submitFormOfferRideSuccess: false,
        submitFormOfferRideFail: action.payload,
      };

    case rideTypes.GET_RIDE_REQUEST:
      return {
        ...state,
        isloadingRide: true,
      };

    case rideTypes.GET_RIDE_SUCCESS:
      return {
        ...state,
        isloadingRide: false,
        rideData: action.payload,
        rideError: "",
      };

    case rideTypes.GET_RIDE_FAIL:
      return {
        ...state,
        isloadingRide: false,
        rideData: [],
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

    //
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
        isloadingUserRideBookingList: true,
      };

    case rideTypes.GET_USER_RIDE_BOOKING_SUCCESS:
      return {
        ...state,
        isloadingUserRideBookingList: false,
        userRideBookingData: action.payload,
        userRideBookingError: "",
      };

    case rideTypes.GET_USER_RIDE_BOOKING_FAIL:
      return {
        ...state,
        isloadingUserRideBookingList: false,
        userRideBookingData: [],
        userRideBookingError: action.payload,
      };

    case rideTypes.GET_DRIVER_RIDE_BOOKING_REQUEST:
      return {
        ...state,
        isloadingDriverRideBookingList: true,
      };

    case rideTypes.GET_DRIVER_RIDE_BOOKING_SUCCESS:
      return {
        ...state,
        isloadingDriverRideBookingList: false,
        driverRideBookingData: action.payload,
        driverRideBookingError: "",
      };

    case rideTypes.GET_DRIVER_RIDE_BOOKING_FAIL:
      return {
        ...state,
        isloadingDriverRideBookingList: false,
        driverRideBookingData: [],
        driverRideBookingError: action.payload,
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
        ridesToFeedbackError: "",
      };

    case rideTypes.GET_RIDES_TO_CONFIRM_FAIL:
      return {
        ...state,
        isLoadingRidesToConfirm: false,
        ridesToConfirmData: [],
        ridesToFeedbackError: action.payload,
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

    // Form search for a city
    case rideTypes.SET_SEARCH_ADDRESS:
      return {
        ...state,
        searchAddress: action.payload,
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
        searchAddress: "",
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
        formOfferRide: {
          ...state.formOfferRide,
          origin: {
            city: action.payload.city,
            province: action.payload.province,
            address: action.payload.address,
            latLng: action.payload.latLng,
            details: action.payload.details,
          },
        },
      };

    case rideTypes.SET_RIDE_DESTINATION:
      return {
        ...state,
        formOfferRide: {
          ...state.formOfferRide,
          destination: {
            city: action.payload.city,
            province: action.payload.province,
            address: action.payload.address,
            latLng: action.payload.latLng,
            details: action.payload.details,
          },
        },
      };

    case rideTypes.SET_RIDE_DATE:
      return {
        ...state,
        formOfferRide: {
          ...state.formOfferRide,
          date: action.payload,
        },
      };

    case rideTypes.SET_RIDE_TIME:
      return {
        ...state,
        formOfferRide: {
          ...state.formOfferRide,
          time: action.payload,
        },
      };

    case rideTypes.SET_RIDE_SEATS:
      return {
        ...state,
        formOfferRide: {
          ...state.formOfferRide,
          seats: action.payload,
        },
      };

    case rideTypes.SET_RIDE_COMMENT:
      return {
        ...state,
        formOfferRide: {
          ...state.formOfferRide,
          comment: action.payload,
        },
      };

    case rideTypes.RESET_FORM_OFFER_RIDE:
      return {
        ...state,
        formOfferRide: {
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
          seats: 0,
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

    case rideTypes.SET_SEARCH_DATE:
      return {
        ...state,
        formSearchRide: {
          ...state.formSearchRide,
          date: action.payload,
        },
      };

    default:
      return state;
  }
};

export default rideReducer;
