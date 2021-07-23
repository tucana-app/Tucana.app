import toastTypes from "./toastTypes";

export const setShowLogoutToast = (bool) => {
  return {
    type: toastTypes.SET_SHOW_LOGOUT_TOAST,
    payload: bool,
  };
};

export const setShowLoginToast = (bool) => {
  return {
    type: toastTypes.SET_SHOW_LOGIN_TOAST,
    payload: bool,
  };
};
