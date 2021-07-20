import userTypes from "./userTypes";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, sigupSuccessful: false, user }
  : {
      isLoggedIn: false,
      signupUserSuccessful: false,
      user: null,
    };

function userReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case userTypes.REGISTER_REQUESTED:
      return {
        ...state,
        signupSuccessful: false,
      };

    case userTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        signupSuccessful: true,
      };

    case userTypes.REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        signupSuccessful: false,
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
