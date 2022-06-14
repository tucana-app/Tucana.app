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

  isLoadingGetApplicationsBecomeDriver: false,
  getApplicationsBecomeDriverData: [],
  getApplicationsBecomeDriverError: "",

  isLoadingSubmitFormBecomeDriver: false,
  submitFormBecomeDriverSuccess: false,
  submitFormBecomeDriverError: "",

  isLoadingUpdateDriverState: false,
  updateDriverStateError: "",

  isLoadingSubmitContactForm: false,

  formApplyDriver: {
    id: {
      type: "",
      number: "",
      country: "",
    },
    license: {
      number: "",
      country: "",
    },
    car: {
      maker: "",
      numberPlate: "",
    },
  },
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
        signupErrorData: "",
      };

    case userTypes.REGISTER_USER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        signupUserSuccessful: false,
        isloadingSignup: false,
        signupErrorData: action.payload,
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
        isLoadingGetApplicationsBecomeDriver: true,
      };

    case userTypes.GET_SUBMISSIONS_BECOME_DRIVER_DATA:
      return {
        ...state,
        isLoadingGetApplicationsBecomeDriver: false,
        getApplicationsBecomeDriverData: action.payload,
        getApplicationsBecomeDriverError: "",
      };

    case userTypes.GET_SUBMISSIONS_BECOME_DRIVER_ERROR:
      return {
        ...state,
        isLoadingGetApplicationsBecomeDriver: false,
        getApplicationsBecomeDriverData: [],
        getApplicationsBecomeDriverError: action.payload,
      };

    // Application form to become a driver
    case userTypes.SET_FORM_BECOME_DRIVER_ID_TYPE:
      return {
        ...state,
        formApplyDriver: {
          ...state.formApplyDriver,
          id: {
            ...state.formApplyDriver.id,
            type: action.payload,
          },
        },
      };

    case userTypes.SET_FORM_BECOME_DRIVER_ID_NUMBER:
      return {
        ...state,
        formApplyDriver: {
          ...state.formApplyDriver,
          id: {
            ...state.formApplyDriver.id,
            number: action.payload,
          },
        },
      };

    case userTypes.SET_FORM_BECOME_DRIVER_ID_COUNTRY:
      return {
        ...state,
        formApplyDriver: {
          ...state.formApplyDriver,
          id: {
            ...state.formApplyDriver.id,
            country: action.payload,
          },
        },
      };

    case userTypes.SET_FORM_BECOME_DRIVER_LICENSE_NUMBER:
      return {
        ...state,
        formApplyDriver: {
          ...state.formApplyDriver,
          license: {
            ...state.formApplyDriver.license,
            number: action.payload,
          },
        },
      };

    case userTypes.SET_FORM_BECOME_DRIVER_LICENSE_COUNTRY:
      return {
        ...state,
        formApplyDriver: {
          ...state.formApplyDriver,
          license: {
            ...state.formApplyDriver.license,
            country: action.payload,
          },
        },
      };

    case userTypes.SET_FORM_BECOME_DRIVER_CAR_MAKER:
      return {
        ...state,
        formApplyDriver: {
          ...state.formApplyDriver,
          car: {
            ...state.formApplyDriver.car,
            maker: action.payload,
          },
        },
      };

    case userTypes.SET_FORM_BECOME_DRIVER_NUMBER_PLATE:
      return {
        ...state,
        formApplyDriver: {
          ...state.formApplyDriver,
          car: {
            ...state.formApplyDriver.car,
            numberPlate: action.payload,
          },
        },
      };

    case userTypes.RESET_APPLICATION_FORM_BECOME_DRIVER:
      return {
        ...state,
        formApplyDriver: {
          id: {
            type: "",
            number: "",
            country: "",
          },
          license: {
            number: "",
            country: "",
          },
          car: {
            maker: "",
            numberPlate: "",
          },
        },
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
            ...state.user.Driver,
            Car: action.payload.Car,
            id: action.payload.id,
            idType: action.payload.idType,
            idNumber: action.payload.idNumber,
            idCountry: action.payload.idCountry,
            licenseNumber: action.payload.licenseNumber,
            licenseCountry: action.payload.licenseCountry,
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
        isLoadingSubmitContactForm: true,
      };

    case userTypes.SUBMIT_CONTACT_FORM_SUCCESS:
      return {
        ...state,
        isLoadingSubmitContactForm: false,
      };

    case userTypes.SUBMIT_CONTACT_FORM_ERROR:
      return {
        ...state,
        isLoadingSubmitContactForm: false,
      };

    default:
      return state;
  }
}

export default userReducer;
