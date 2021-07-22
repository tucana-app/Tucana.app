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

    default:
      return state;
  }
}

export default userReducer;
