import toastTypes from "./toastTypes";

const initialState = {
  showLogoutToast: false,
  showLoginSuccessToast: false,
};

const toastReducer = (state = initialState, action) => {
  switch (action.type) {
    case toastTypes.SET_SHOW_LOGOUT_TOAST:
      return {
        ...state,
        showLogoutToast: action.payload,
      };

    case toastTypes.SET_SHOW_LOGIN_SUCCESS_TOAST:
      return {
        ...state,
        showLoginSuccessToast: action.payload,
      };

    default:
      return state;
  }
};

export default toastReducer;
