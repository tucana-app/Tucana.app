import globalTypes from "./globalTypes";

export const setfeedback = (message) => ({
  type: globalTypes.SET_FEEDBACK,
  payload: message,
});

export const clearFeedback = () => ({
  type: globalTypes.CLEAR_FEEDBACK,
});
