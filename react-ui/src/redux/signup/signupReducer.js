import signupTypes from "./signupTypes";

const initialState = {
  email: "",
  firstName: "",
  lastName: "",
  username: "",
  dateOfBirth: "",
  language: "",
  phoneNumber: "",

  isLoadingCheckDuplicatedUsername: false,
  checkDuplicateUsernameSuccess: "",
  checkDuplicateUsernameFail: "",

  isLoadingCheckDuplicatedEmail: false,
  checkDuplicateEmailSuccess: "",
  checkDuplicateEmailFail: "",

  isLoadingCheckDuplicatedPhoneNumber: false,
  checkDuplicatePhoneNumberSuccess: "",
  checkDuplicatePhoneNumberFail: "",

  isUsernameDuplicate: false,
  isEmailDuplicate: false,
  isPhoneNumberDuplicate: false,
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case signupTypes.CHANGE_FORM_EMAIL:
      return {
        ...state,
        email: action.payload,
      };

    case signupTypes.CHANGE_FORM_FIRSTNAME:
      return {
        ...state,
        firstName: action.payload,
      };

    case signupTypes.CHANGE_FORM_LASTNAME:
      return {
        ...state,
        lastName: action.payload,
      };

    case signupTypes.CHANGE_FORM_USERNAME:
      return {
        ...state,
        username: action.payload,
      };

    case signupTypes.CHANGE_FORM_DATEOFBIRTH:
      return {
        ...state,
        dateOfBirth: action.payload,
      };

    case signupTypes.CHANGE_FORM_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };

    case signupTypes.CHANGE_FORM_PHONENUMBER:
      return {
        ...state,
        phoneNumber: action.payload,
      };

    // Request check USERNAME duplicate
    case signupTypes.CHECK_DUPLICATE_USERNAME_REQUESTED:
      return {
        ...state,
        isLoadingCheckDuplicatedUsername: true,
      };

    case signupTypes.CHECK_DUPLICATE_USERNAME_SUCCESS:
      return {
        ...state,

        checkDuplicateUsernameSuccess: action.payload.message,
        checkDuplicateUsernameFail: "",

        isUsernameDuplicate: action.payload.isUsernameDuplicate,

        isLoadingCheckDuplicatedUsername: false,
      };

    case signupTypes.CHECK_DUPLICATE_USERNAME_FAIL:
      return {
        ...state,

        checkDuplicateUsernameSuccess: "",
        checkDuplicateUsernameFail: action.payload,

        isLoadingCheckDuplicatedUsername: false,
      };

    // Request check EMAIL duplicate
    case signupTypes.CHECK_DUPLICATE_EMAIL_REQUESTED:
      return {
        ...state,
        isLoadingCheckDuplicatedEmail: true,
      };

    case signupTypes.CHECK_DUPLICATE_EMAIL_SUCCESS:
      return {
        ...state,

        checkDuplicateEmailSuccess: action.payload.message,
        checkDuplicateEmailFail: "",

        isEmailDuplicate: action.payload.isEmailDuplicate,

        isLoadingCheckDuplicatedEmail: false,
      };

    case signupTypes.CHECK_DUPLICATE_EMAIL_FAIL:
      return {
        ...state,

        checkDuplicateEmailSuccess: "",
        checkDuplicateEmailFail: action.payload,

        isLoadingCheckDuplicatedEmail: false,
      };

    // Request check PHONENUMBER duplicate
    case signupTypes.CHECK_DUPLICATE_PHONENUMBER_REQUESTED:
      return {
        ...state,
        isLoadingCheckDuplicatedPhoneNumber: true,
      };

    case signupTypes.CHECK_DUPLICATE_PHONENUMBER_SUCCESS:
      return {
        ...state,

        checkDuplicatePhoneNumberSuccess: action.payload.message,
        checkDuplicatePhoneNumberFail: "",

        isPhoneNumberDuplicate: action.payload.isPhoneNumberDuplicate,

        isLoadingCheckDuplicatedPhoneNumber: false,
      };

    case signupTypes.CHECK_DUPLICATE_PHONENUMBER_FAIL:
      return {
        ...state,

        checkDuplicatePhoneNumberSuccess: "",
        checkDuplicatePhoneNumberFail: action.payload,

        isLoadingCheckDuplicatedPhoneNumber: false,
      };

    default:
      return state;
  }
};

export default signupReducer;
