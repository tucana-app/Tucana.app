import toastTypes from "./toastTypes";

export const setShowToast = (data) => {
  return {
    type: toastTypes.SET_SHOW_TOAST,
    payload: data,
  };
};
