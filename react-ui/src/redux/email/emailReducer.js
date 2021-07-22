import emailTypes from "./emailTypes";

const initialState = {
  isLoadingSendEmail: false,
  sendEmailSuccess: false,
  sendEmailError: "",
};

const emailReducer = (state = initialState, action) => {
  switch (action.type) {
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
        sendEmailSuccess: [],
        sendEmailError: action.payload,
      };

    default:
      return state;
  }
};

export default emailReducer;
