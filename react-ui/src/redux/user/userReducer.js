import userTypes from "./userTypes";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, signupUserSuccessful: false, user }
  : {
      isLoggedIn: false,
      signupUserSuccessful: false,
      user: null,
    };

function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case userTypes.REGISTER_USER_REQUESTED:
      return {
        ...state,
        signupUserSuccessful: false,
      };

    case userTypes.REGISTER_USER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        signupUserSuccessful: true,
      };

    case userTypes.REGISTER_USER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        signupUserSuccessful: false,
      };

    case userTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };

    case userTypes.LOGIN_FAIL:
      return {
        ...state,
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
