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

  isloadingSignup: false,
  signupUserSuccess: {},
  signupUserFail: "",

  isloadingLogin: false,
  loginErrorData: "",

  isLoadingConfirmEmail: false,
  confirmEmailData: "",
  confirmEmailError: "",

  isLoadingSetUserAvatar: false,
  setUserAvatarData: "",
  setUserAvatarError: "",

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

  isLoadingApplicationBecomeDriver: false,
  applicationBecomeDriverData: [],
  applicationBecomeDriverError: "",

  isLoadingSubmitFormBecomeDriver: false,
  submitFormBecomeDriverSuccess: false,
  submitFormBecomeDriverError: "",

  isLoadingUpdateDriverState: false,
  updateDriverStateSuccess: false,
  updateDriverStateError: "",

  isLoadingUpdateUserRatingsState: false,
  updateUserRatingsSuccess: false,
  updateUserRatingsError: "",

  isLoadingUpdateUserExperience: false,
  updateUserExperienceSuccess: false,
  updateUserExperienceError: "",

  isLoadingSubmitEditBio: false,
  submitEditBioSuccess: "",
  submitEditBioError: "",

  isLoadingSubmitEditPassword: false,
  submitEditPasswordSuccess: {},
  submitEditPasswordError: "",

  isLoadingSubmitEditDateOfBirth: false,
  submitEditDateOfBirthSuccess: {},
  submitEditDateOfBirthError: "",

  isLoadingSubmitCloseAccount: false,
  submitCloseAccountSuccess: {},
  submitCloseAccountError: "",

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

  isLoadingUpdateUser: false,
  updateUserSuccess: false,
  updateUserError: "",

  isloadingDriverProfile: false,
  driverProfileData: {},
  driverProfileError: "",

  isloadingPublicProfile: false,
  publicProfileData: {},
  publicProfileError: "",

  isloadingDriverEarnings: false,
  driverEarningsData: [],
  driverEarningsError: "",
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    // Register User
    case userTypes.REGISTER_USER_REQUESTED:
      return {
        ...state,
        isloadingSignup: true,
      };

    case userTypes.REGISTER_USER_SUCCESS:
      return {
        ...state,
        isloadingSignup: false,
        signupUserSuccess: action.payload,
        signupUserFail: "",
      };

    case userTypes.REGISTER_USER_FAIL:
      return {
        ...state,
        isloadingSignup: false,
        signupUserSuccess: {},
        signupUserFail: action.payload,
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
      return {};

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

    // Get a single driver's application

    case userTypes.GET_APPLICATION_BECOME_DRIVER_REQUESTED:
      return {
        ...state,
        isLoadingApplicationBecomeDriver: true,
      };

    case userTypes.GET_APPLICATION_BECOME_DRIVER_DATA:
      return {
        ...state,
        isLoadingApplicationBecomeDriver: false,
        applicationBecomeDriverData: action.payload,
        applicationBecomeDriverError: "",
      };

    case userTypes.GET_APPLICATION_BECOME_DRIVER_ERROR:
      return {
        ...state,
        isLoadingApplicationBecomeDriver: false,
        applicationBecomeDriverData: [],
        applicationBecomeDriverError: action.payload,
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

    // Update users's experience

    case userTypes.UPDATE_USER_EXPERIENCE_REQUESTED:
      return {
        ...state,
        isLoadingUpdateUserExperience: true,
      };

    case userTypes.UPDATE_USER_EXPERIENCE_SUCCESS:
      return {
        ...state,
        isLoadingUpdateUserExperience: false,
        user: {
          ...state.user,
          ExperienceUser: action.payload,
        },
        updateUserExperienceError: "",
      };

    case userTypes.UPDATE_USER_EXPERIENCE_ERROR:
      return {
        ...state,
        isLoadingUpdateUserExperience: false,
        updateUserExperienceError: action.payload,
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

    // Submit edit bio

    case userTypes.SUBMIT_EDIT_BIO_REQUESTED:
      return {
        ...state,
        isLoadingSubmitEditBio: true,
      };

    case userTypes.SUBMIT_EDIT_BIO_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          biography: action.payload.bio,
        },
        isLoadingSubmitEditBio: false,
        submitEditBioSuccess: action.payload,
        submitEditBioError: "",
      };

    case userTypes.SUBMIT_EDIT_BIO_ERROR:
      return {
        ...state,
        isLoadingSubmitEditBio: false,
        submitEditBioSuccess: false,
        submitEditBioError: action.payload,
      };

    // Submit edit password

    case userTypes.SUBMIT_EDIT_PASSWORD_REQUESTED:
      return {
        ...state,
        isLoadingSubmitEditPassword: true,
      };

    case userTypes.SUBMIT_EDIT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoadingSubmitEditPassword: false,
        submitEditPasswordSuccess: action.payload,
        submitEditPasswordError: "",
      };

    case userTypes.SUBMIT_EDIT_PASSWORD_ERROR:
      return {
        ...state,
        isLoadingSubmitEditPassword: false,
        submitEditPasswordSuccess: false,
        submitEditPasswordError: action.payload,
      };

    // Submit edit date of birth

    case userTypes.SUBMIT_EDIT_DATE_OF_BIRTH_REQUESTED:
      return {
        ...state,
        isLoadingSubmitEditDateOfBirth: true,
      };

    case userTypes.SUBMIT_EDIT_DATE_OF_BIRTH_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          dateOfBirth: action.payload.dateOfBirth,
        },
        isLoadingSubmitEditDateOfBirth: false,
        submitEditDateOfBirthSuccess: action.payload,
        submitEditDateOfBirthError: "",
      };

    case userTypes.SUBMIT_EDIT_DATE_OF_BIRTH_ERROR:
      return {
        ...state,
        isLoadingSubmitEditDateOfBirth: false,
        submitEditDateOfBirthSuccess: false,
        submitEditDateOfBirthError: action.payload,
      };

    // Submit close account

    case userTypes.SUBMIT_REMOVE_ACCOUNT_REQUESTED:
      return {
        ...state,
        isLoadingSubmitCloseAccount: true,
      };

    case userTypes.SUBMIT_REMOVE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isLoadingSubmitCloseAccount: false,
        submitCloseAccountSuccess: action.payload,
        submitCloseAccountError: "",
      };

    case userTypes.SUBMIT_REMOVE_ACCOUNT_ERROR:
      return {
        ...state,
        isLoadingSubmitCloseAccount: false,
        submitCloseAccountSuccess: {},
        submitCloseAccountError: action.payload,
      };

    // Update user

    case userTypes.UPDATE_USER_REQUESTED:
      return {
        ...state,
        isLoadingUpdateUser: true,
      };

    case userTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        isLoadingUpdateUser: false,
        user: {
          accessToken: user.accessToken,
          ...action.payload,
        },
        updateUserError: "",
      };

    case userTypes.UPDATE_USER_ERROR:
      return {
        ...state,
        isLoadingUpdateUser: false,
        updateUserSuccess: false,
        updateUserError: action.payload,
      };

    // Get the current user's driver profile
    case userTypes.GET_DRIVER_PROFILE_REQUEST:
      return {
        ...state,
        isloadingDriverProfile: true,
      };

    case userTypes.GET_DRIVER_PROFILE_SUCCESS:
      return {
        ...state,
        isloadingDriverProfile: false,
        driverProfileData: action.payload,
        driverProfileError: "",
      };

    case userTypes.GET_DRIVER_PROFILE_FAIL:
      return {
        ...state,
        isloadingDriverProfile: false,
        driverProfileData: {},
        driverProfileError: action.payload,
      };

    // Get a public user's profile
    case userTypes.GET_PUBLIC_PROFILE_REQUEST:
      return {
        ...state,
        isloadingPublicProfile: true,
      };

    case userTypes.GET_PUBLIC_PROFILE_SUCCESS:
      return {
        ...state,
        isloadingPublicProfile: false,
        publicProfileData: action.payload,
        publicProfileError: "",
      };

    case userTypes.GET_PUBLIC_PROFILE_FAIL:
      return {
        ...state,
        isloadingPublicProfile: false,
        publicProfileData: {},
        publicProfileError: action.payload,
      };

    // Get a driver's earnings
    case userTypes.GET_DRIVER_EARNINGS_REQUEST:
      return {
        ...state,
        isloadingDriverEarnings: true,
      };

    case userTypes.GET_DRIVER_EARNINGS_SUCCESS:
      return {
        ...state,
        isloadingDriverEarnings: false,
        driverEarningsData: action.payload,
        driverEarningsError: "",
      };

    case userTypes.GET_DRIVER_EARNINGS_FAIL:
      return {
        ...state,
        isloadingDriverEarnings: false,
        driverEarningsData: [],
        driverEarningsError: action.payload,
      };

    default:
      return state;
  }
}

export default userReducer;
