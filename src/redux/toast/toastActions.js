import toastTypes from "./toastTypes";

export const setToast = (data) => {
  return {
    type: toastTypes.SET_TOAST,
    payload: data,
  };
};
