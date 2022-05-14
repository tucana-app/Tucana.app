import userTypes from "./userTypes";

const user = JSON.parse(localStorage.getItem("user"));

let initialState = user
  ? {
      isLoggedIn: true,
      user,
    }
  : {
      isLoggedIn: false,
      user: null,
    };

initialState = {
  ...initialState,
  isloadingLogin: false,
  isloadingSignup: false,
  signupUserSuccessful: false,
  signupErrorFlag: "",
  signupErrorMessage: "",
  loginErrorData: "",

  isLoadingSendEmailForgotPassword: false,
  sendEmailForgotPasswordData: [],
  sendEmailForgotPasswordError: "",

  isLoadingCheckDeprecatedLinkResetPassword: false,
  checkDeprecatedLinkResetPasswordData: {},
  checkDeprecatedLinkResetPasswordError: "",

  isLoadingResetPassword: false,
  resetPasswordData: {},
  resetPasswordError: "",

  isLoadingResendConfirmationLink: false,
  resendConfirmationLinkData: {},
  resendConfirmationLinkError: "",

  isLoadingGetSubmissionsBecomeDriver: false,
  getSubmissionsBecomeDriverData: [],
  getSubmissionsBecomeDriverError: "",

  isLoadingSubmitFormBecomeDriver: false,
  submitFormBecomeDriverSuccess: false,
  submitFormBecomeDriverError: "",

  isLoadingUpdateDriverState: false,
  updateDriverStateError: "",

  isLoadingSubmitFormContact: false,
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case userTypes.REGISTER_USER_REQUESTED:
      return {
        ...state,
        signupUserSuccessful: false,
        isloadingSignup: true,
      };

    case userTypes.REGISTER_USER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        signupUserSuccessful: true,
        isloadingSignup: false,
        signupErrorFlag: "",
        signupErrorMessage: "",
      };

    case userTypes.REGISTER_USER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        signupUserSuccessful: false,
        isloadingSignup: false,
        signupErrorFlag: action.payload.flag,
        signupErrorMessage: action.payload.message,
      };

    case userTypes.LOGIN_REQUESTED:
      return {
        ...state,
        isloadingLogin: true,
      };

    case userTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isloadingLogin: false,
        isLoggedIn: true,
        user: payload.user,
        loginErrorData: "",
      };

    case userTypes.LOGIN_FAIL:
      return {
        ...state,
        isloadingLogin: false,
        isLoggedIn: false,
        user: null,
        loginErrorData: action.payload,
      };

    case userTypes.LOGOUT:
      return {
        isLoggedIn: false,
        user: null,
      };

    // Forgot password

    case userTypes.SEND_EMAIL_FORGOT_PASSWORD_REQUESTED:
      return {
        ...state,
        isLoadingSendEmailForgotPassword: true,
      };

    case userTypes.SEND_EMAIL_FORGOT_PASSWORD_DATA:
      return {
        ...state,
        isLoadingSendEmailForgotPassword: false,
        sendEmailForgotPasswordData: action.payload,
        sendEmailForgotPasswordError: "",
      };

    case userTypes.SEND_EMAIL_FORGOT_PASSWORD_ERROR:
      return {
        ...state,
        isLoadingSendEmailForgotPassword: false,
        sendEmailForgotPasswordData: [],
        sendEmailForgotPasswordError: action.payload,
      };

    // Check deprecated link reset password

    case userTypes.CHECK_DEPRECATED_LINK_RESET_PASSWORD_REQUESTED:
      return {
        ...state,
        isLoadingCheckDeprecatedLinkResetPassword: true,
      };

    case userTypes.CHECK_DEPRECATED_LINK_RESET_PASSWORD_DATA:
      return {
        ...state,
        isLoadingCheckDeprecatedLinkResetPassword: false,
        checkDeprecatedLinkResetPasswordData: action.payload,
        checkDeprecatedLinkResetPasswordError: "",
      };

    case userTypes.CHECK_DEPRECATED_LINK_RESET_PASSWORD_ERROR:
      return {
        ...state,
        isLoadingCheckDeprecatedLinkResetPassword: false,
        checkDeprecatedLinkResetPasswordData: {},
        checkDeprecatedLinkResetPasswordError: action.payload,
      };

    // Reset password

    case userTypes.RESET_PASSWORD_REQUESTED:
      return {
        ...state,
        isLoadingResetPassword: true,
      };

    case userTypes.RESET_PASSWORD_DATA:
      return {
        ...state,
        isLoadingResetPassword: false,
        resetPasswordData: action.payload,
        resetPasswordError: "",
      };

    case userTypes.RESET_PASSWORD_ERROR:
      return {
        ...state,
        isLoadingResetPassword: false,
        resetPasswordData: [],
        resetPasswordError: action.payload,
      };

    // Resend the account confirmation link

    case userTypes.RESEND_CONFIRMATION_LINK_REQUESTED:
      return {
        ...state,
        isLoadingResendConfirmationLink: true,
        loginErrorData: "",
      };

    case userTypes.RESEND_CONFIRMATION_LINK_DATA:
      return {
        ...state,
        isLoadingResendConfirmationLink: false,
        resendConfirmationLinkData: action.payload,
        resendConfirmationLinkError: "",
      };

    case userTypes.RESEND_CONFIRMATION_LINK_ERROR:
      return {
        ...state,
        isLoadingResendConfirmationLink: false,
        resendConfirmationLinkData: [],
        resendConfirmationLinkError: action.payload,
      };

    // Get the submissions for become a driver form

    case userTypes.GET_SUBMISSIONS_BECOME_DRIVER_REQUESTED:
      return {
        ...state,
        isLoadingGetSubmissionsBecomeDriver: true,
      };

    case userTypes.GET_SUBMISSIONS_BECOME_DRIVER_DATA:
      return {
        ...state,
        isLoadingGetSubmissionsBecomeDriver: false,
        getSubmissionsBecomeDriverData: action.payload,
        getSubmissionsBecomeDriverError: "",
      };

    case userTypes.GET_SUBMISSIONS_BECOME_DRIVER_ERROR:
      return {
        ...state,
        isLoadingGetSubmissionsBecomeDriver: false,
        getSubmissionsBecomeDriverData: [],
        getSubmissionsBecomeDriverError: action.payload,
      };

    // Submit the form to become a driver

    case userTypes.SUBMIT_FORM_BECOME_DRIVER_REQUESTED:
      return {
        ...state,
        isLoadingSubmitFormBecomeDriver: true,
        loginErrorData: "",
      };

    case userTypes.SUBMIT_FORM_BECOME_DRIVER_SUCCESS:
      return {
        ...state,
        isLoadingSubmitFormBecomeDriver: false,
        submitFormBecomeDriverSuccess: true,
        submitFormBecomeDriverError: "",
      };

    case userTypes.SUBMIT_FORM_BECOME_DRIVER_ERROR:
      return {
        ...state,
        isLoadingSubmitFormBecomeDriver: false,
        submitFormBecomeDriverSuccess: false,
        submitFormBecomeDriverError: action.payload,
      };

    // Update the driver's state

    case userTypes.UPDATE_DRIVER_STATE_REQUESTED:
      return {
        ...state,
        isLoadingUpdateDriverState: true,
        loginErrorData: "",
      };

    case userTypes.UPDATE_DRIVER_STATE_SUCCESS:
      return {
        ...state,
        isLoadingUpdateDriverState: false,
        user: {
          ...user,
          Driver: {
            id: action.payload.id,
          },
        },
        updateDriverStateError: "",
      };

    case userTypes.UPDATE_DRIVER_STATE_ERROR:
      return {
        ...state,
        isLoadingUpdateDriverState: false,
        updateDriverStateError: action.payload,
      };

    // Contact form

    case userTypes.SUBMIT_CONTACT_FORM_REQUESTED:
      return {
        ...state,
        isLoadingSubmitFormContact: true,
      };

    case userTypes.SUBMIT_CONTACT_FORM_SUCCESS:
      return {
        ...state,
        isLoadingSubmitFormContact: false,
      };

    case userTypes.SUBMIT_CONTACT_FORM_ERROR:
      return {
        ...state,
        isLoadingSubmitFormContact: false,
      };

    default:
      return state;
  }
}

export default userReducer;
