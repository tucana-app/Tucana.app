import toastTypes from "./toastTypes";

const initialState = {
  showLogoutToast: false,
  showLoginToast: false,
};

const toastReducer = (state = initialState, action) => {
  switch (action.type) {
    case toastTypes.SET_SHOW_LOGOUT_TOAST:
      return {
        ...state,
        showLogoutToast: action.payload,
      };

    case toastTypes.SET_SHOW_LOGIN_TOAST:
      return {
        ...state,
        showLoginToast: action.payload,
      };

    default:
      return state;
  }
};

export default toastReducer;
