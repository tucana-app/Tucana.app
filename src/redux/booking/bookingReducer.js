import bookingTypes from "./bookingTypes";

const initialState = {
  isloadingSubmitCancelBooking: false,
  submitCancelBookingData: {},
  submitCancelBookingError: "",
};

function bookingReducer(state = initialState, action) {
  switch (action.type) {
    case bookingTypes.SUBMIT_CANCEL_BOOKING_REQUEST:
      return {
        ...state,
        isloadingSubmitCancelBooking: true,
      };

    case bookingTypes.SUBMIT_CANCEL_BOOKING_SUCCESS:
      return {
        ...state,
        isloadingSubmitCancelBooking: false,
        submitCancelBookingData: action.payload,
        submitCancelBookingError: "",
      };

    case bookingTypes.SUBMIT_CANCEL_BOOKING_FAIL:
      return {
        ...state,
        isloadingSubmitCancelBooking: false,
        submitCancelBookingData: {},
        submitCancelBookingError: action.payload,
      };

    default:
      return state;
  }
}

export default bookingReducer;
