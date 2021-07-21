import userTypes from "./userTypes";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? {
      isloadingLogin: false,
      isLoggedIn: true,
      user,
      isloadingSignup: false,
      signupUserSuccessful: false,
    }
  : {
      isloadingLogin: false,
      isLoggedIn: false,
      user: null,
      isloadingSignup: false,
      signupUserSuccessful: false,
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
      };

    case userTypes.REGISTER_USER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        signupUserSuccessful: false,
        isloadingSignup: false,
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
      };

    case userTypes.LOGIN_FAIL:
      return {
        ...state,
        isloadingLogin: false,
        isLoggedIn: false,
        user: null,
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
