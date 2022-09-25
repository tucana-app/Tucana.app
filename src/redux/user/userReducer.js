import userTypes from "./userTypes";

const user = JSON.parse(localStorage.getItem("user"));

var initialState = user
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

  isLoadingConfirmEmail: false,
  confirmEmailData: "",
  confirmEmailError: "",

  isLoadingSetUserAvatar: false,
  setUserAvatarData: "",
  setUserAvatarError: "",

  isLoadingSetUserFirstSetup: false,
  setUserFirstSetupData: "",
  setUserFirstSetupError: "",

  isLoadingSendEmailForgotPassword: false,
  sendEmailForgotPasswordData: "",
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
  updateDriverStateSuccess: false,
  updateDriverStateError: "",

  isLoadingUpdateUserRatingsState: false,
  updateUserRatingsSuccess: false,
  updateUserRatingsError: "",

  isLoadingSubmitEditBioState: false,
  submitEditBioSuccess: false,
  submitEditBioError: "",

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
      model: "",
      numberPlate: "",
      year: "",
      color: "",
      marchamo: "",
      riteve: {
        month: "",
        year: "",
      },
    },
  },
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    // Register User
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

    // Login user

    case userTypes.LOGIN_REQUESTED:
      return {
        ...state,
        isloadingLogin: true,
      };

    case userTypes.LOGIN_SUCCESS:
      return {
        ...initialState,
        isloadingLogin: false,
        isLoggedIn: true,
        user: action.payload,
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

    // Log out User

    case userTypes.LOGOUT:
      return {
        isLoggedIn: false,
        user: null,
      };

    // Set user's avatar

    case userTypes.SET_USER_AVATAR_REQUESTED:
      return {
        ...state,
        isLoadingSetUserAvatar: true,
      };

    case userTypes.SET_USER_AVATAR_DATA:
      return {
        ...state,
        isLoadingSetUserAvatar: false,
        setUserAvatarData: action.payload,
        setUserAvatarError: "",
        user: {
          ...state.user,
          avatar: action.payload.avatar,
        },
      };

    case userTypes.SET_USER_AVATAR_ERROR:
      return {
        ...state,
        isLoadingSetUserAvatar: false,
        setUserAvatarData: "",
        setUserAvatarError: action.payload,
      };

    // Change user's first setup

    case userTypes.SET_USER_FIRST_SETUP_REQUESTED:
      return {
        ...state,
        isLoadingSetUserFirstSetup: true,
      };

    case userTypes.SET_USER_FIRST_SETUP_DATA:
      return {
        ...state,
        isLoadingSetUserFirstSetup: false,
        setUserFirstSetupData: action.payload,
        setUserFirstSetupError: "",
        user: {
          ...state.user,
          firstSetUp: false,
        },
      };

    case userTypes.SET_USER_FIRST_SETUP_ERROR:
      return {
        ...state,
        isLoadingSetUserFirstSetup: false,
        setUserFirstSetupData: "",
        setUserFirstSetupError: action.payload,
      };

    // Confirm email

    case userTypes.CONFIRM_EMAIL_REQUESTED:
      return {
        ...state,
        isLoadingConfirmEmail: true,
      };

    case userTypes.CONFIRM_EMAIL_DATA:
      return {
        ...state,
        isLoadingConfirmEmail: false,
        confirmEmailData: action.payload,
        confirmEmailError: "",
      };

    case userTypes.CONFIRM_EMAIL_ERROR:
      return {
        ...state,
        isLoadingConfirmEmail: false,
        confirmEmailData: "",
        confirmEmailError: action.payload,
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
        sendEmailForgotPasswordData: "",
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

    case userTypes.SET_FORM_BECOME_DRIVER_CAR_MODEL:
      return {
        ...state,
        formApplyDriver: {
          ...state.formApplyDriver,
          car: {
            ...state.formApplyDriver.car,
            model: action.payload,
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

    case userTypes.SET_FORM_BECOME_DRIVER_CAR_YEAR:
      return {
        ...state,
        formApplyDriver: {
          ...state.formApplyDriver,
          car: {
            ...state.formApplyDriver.car,
            year: action.payload,
          },
        },
      };

    case userTypes.SET_FORM_BECOME_DRIVER_CAR_COLOR:
      return {
        ...state,
        formApplyDriver: {
          ...state.formApplyDriver,
          car: {
            ...state.formApplyDriver.car,
            color: action.payload,
          },
        },
      };

    case userTypes.SET_FORM_BECOME_DRIVER_CAR_MARCHAMO:
      return {
        ...state,
        formApplyDriver: {
          ...state.formApplyDriver,
          car: {
            ...state.formApplyDriver.car,
            marchamo: action.payload,
          },
        },
      };

    case userTypes.SET_FORM_BECOME_DRIVER_CAR_RITEVE_MONTH:
      return {
        ...state,
        formApplyDriver: {
          ...state.formApplyDriver,
          car: {
            ...state.formApplyDriver.car,
            riteve: {
              ...state.formApplyDriver.car.riteve,
              month: action.payload,
            },
          },
        },
      };

    case userTypes.SET_FORM_BECOME_DRIVER_CAR_RITEVE_YEAR:
      return {
        ...state,
        formApplyDriver: {
          ...state.formApplyDriver,
          car: {
            ...state.formApplyDriver.car,
            riteve: {
              ...state.formApplyDriver.car.riteve,
              year: action.payload,
            },
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
            model: "",
            numberPlate: "",
            year: "",
            color: "",
            marchamo: "",
            riteve: {
              month: "",
              year: "",
            },
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
          ...state.user,
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

    // Update users's ratings

    case userTypes.UPDATE_USER_RATINGS_REQUESTED:
      return {
        ...state,
        isLoadingUpdateUserRatings: true,
      };

    case userTypes.UPDATE_USER_RATINGS_SUCCESS:
      return {
        ...state,
        isLoadingUpdateUserRatings: false,
        user: {
          ...state.user,
          Rating: action.payload,
        },
        updateUserRatingsError: "",
      };

    case userTypes.UPDATE_USER_RATINGS_ERROR:
      return {
        ...state,
        isLoadingUpdateUserRatings: false,
        updateUserRatingsError: action.payload,
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

    // Contact form

    case userTypes.SUBMIT_EDIT_BIO_REQUESTED:
      return {
        ...state,
        isLoadingSubmitEditBioState: true,
      };

    case userTypes.SUBMIT_EDIT_BIO_SUCCESS:
      return {
        ...state,
        isLoadingSubmitEditBioState: false,
        submitEditBioSuccess: action.payload,
        submitEditBioError: "",
      };

    case userTypes.SUBMIT_EDIT_BIO_ERROR:
      return {
        ...state,
        isLoadingSubmitEditBioState: false,
        submitEditBioSuccess: false,
        submitEditBioError: action.payload,
      };

    default:
      return state;
  }
}

export default userReducer;
