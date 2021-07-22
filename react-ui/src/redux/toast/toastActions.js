import toastTypes from "./toastTypes";

export const setShowLogoutToast = (bool) => {
  return {
    type: toastTypes.SET_SHOW_LOGOUT_TOAST,
    payload: bool,
  };
};

export const setShowLoginSuccessToast = (bool) => {
  return {
    type: toastTypes.SET_SHOW_LOGIN_SUCCESS_TOAST,
    payload: bool,
  };
};
