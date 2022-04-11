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
  loginErrorFlag: "",
  loginErrorMessage: "",

  isLoadingSendEmailForgotPassword: false,
  sendEmailForgotPasswordData: [],
  sendEmailForgotPasswordError: "",

  isLoadingCheckDeprecatedLinkResetPassword: false,
  checkDeprecatedLinkResetPasswordData: {},
  checkDeprecatedLinkResetPasswordError: "",

  isLoadingResetPassword: false,
  resetPasswordData: {},
  resetPasswordError: "",
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
        loginErrorFlag: "",
        loginErrorMessage: "",
      };

    case userTypes.LOGIN_FAIL:
      return {
        ...state,
        isloadingLogin: false,
        isLoggedIn: false,
        user: null,
        loginErrorFlag: action.payload.flag,
        loginErrorMessage: action.payload.message,
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

    default:
      return state;
  }
}

export default userReducer;
