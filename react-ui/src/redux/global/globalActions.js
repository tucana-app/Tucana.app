import globalTypes from "./globalTypes";

export const setNotificationFeedback = (message) => ({
  type: globalTypes.SET_FEEDBACK_NOTIFICATION,
  payload: message,
});

export const clearNotificationFeedback = () => ({
  type: globalTypes.CLEAR_FEEDBACK_NOTIFICATION,
});
