import rideTypes from "./rideTypes";

const initialState = {
  isLoadingDriverRidesList: false,
  userRidesListData: [],
  userRidesListError: "",

  isLoadingSubmitFormOfferRide: false,
  submitFormOfferRideSuccess: false,
  submitFormOfferRideFail: "",

  isloadingRide: false,
  rideData: [],
  rideError: "",

  isloadingBooking: false,
  bookingData: {},
  bookingError: "",

  isloadingAllRidesList: false,
  allRidesListData: [],
  allRidesListError: "",

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

  isLoadingPassengersDetails: false,
  passengersDetailsData: [],
  passengersDetailsError: "",
};

const rideReducer = (state = initialState, action) => {
  switch (action.type) {
    case rideTypes.GET_USER_RIDES_REQUEST:
      return {
        ...state,
        isLoadingDriverRidesList: true,
      };

    case rideTypes.GET_USER_RIDES_SUCCESS:
      return {
        ...state,
        isLoadingDriverRidesList: false,
        userRidesListData: action.payload,
        totalRidesDriverOnGoing: action.payload.length,
        userRidesListError: "",
      };

    case rideTypes.GET_USER_RIDES_FAIL:
      return {
        ...state,
        isLoadingDriverRidesList: false,
        userRidesListData: [],
        userRidesListError: action.payload,
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

    case rideTypes.GET_ALL_RIDES_REQUEST:
      return {
        ...state,
        isloadingAllRidesList: true,
      };

    case rideTypes.GET_ALL_RIDES_SUCCESS:
      return {
        ...state,
        isloadingAllRidesList: false,
        allRidesListData: action.payload,
        allRidesListError: "",
      };

    case rideTypes.GET_ALL_RIDES_FAIL:
      return {
        ...state,
        isloadingAllRidesList: false,
        allRidesListData: [],
        allRidesListError: action.payload,
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

    default:
      return state;
  }
};

export default rideReducer;
