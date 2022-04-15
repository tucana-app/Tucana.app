import emailTypes from "./emailTypes";

const initialState = {
  isLoadingConfirmEmail: false,
  confirmEmailSuccess: "",
  confirmEmailError: "",

  isLoadingSendEmail: false,
  sendEmailSuccess: false,
  sendEmailError: "",
};

const emailReducer = (state = initialState, action) => {
  switch (action.type) {
    case emailTypes.CONFIRM_EMAIL_REQUEST:
      return {
        ...state,
        isLoadingConfirmEmail: true,
      };

    case emailTypes.CONFIRM_EMAIL_SUCCESS:
      return {
        ...state,
        isLoadingConfirmEmail: false,
        confirmEmailSuccess: action.payload,
        confirmEmailError: false,
      };

    case emailTypes.CONFIRM_EMAIL_FAIL:
      return {
        ...state,
        isLoadingConfirmEmail: false,
        confirmEmailSuccess: false,
        confirmEmailError: action.payload,
      };

    case emailTypes.SEND_EMAIL_REQUEST:
      return {
        ...state,
        isLoadingSendEmail: true,
      };

    case emailTypes.SEND_EMAIL_SUCCESS:
      return {
        ...state,
        isLoadingSendEmail: false,
        sendEmailSuccess: action.payload,
        sendEmailError: "",
      };

    case emailTypes.SEND_EMAIL_FAIL:
      return {
        ...state,
        isLoadingSendEmail: false,
        sendEmailSuccess: "",
        sendEmailError: action.payload,
      };

    default:
      return state;
  }
};

export default emailReducer;
