import messageTypes from "./messageTypes";
import axios from "axios";
import { setfeedback } from "../global/globalActions";

const URL_API = process.env.REACT_APP_URL_API;

// Get all user's messages

export const getAllUserMessagesRequested = () => {
  return {
    type: messageTypes.GET_ALL_USER_MESSAGES_REQUEST,
  };
};

export const getAllUserMessages = (userId) => {
  return (dispatch) => {
    dispatch(getAllUserMessagesRequested());

    axios
      .get(URL_API + "/message/all-user-messages", {
        params: {
          userId,
        },
      })
      .then((response) => {
        // console.log(response.data);

        dispatch(getAllUserMessagesSuccess(response.data));
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        // console.log(error);
        dispatch(setfeedback({ message, variant: "danger" }));
        dispatch(getAllUserMessagesFail(error));
      });
  };
};

export const getAllUserMessagesSuccess = (data) => {
  return {
    type: messageTypes.GET_ALL_USER_MESSAGES_SUCCESS,
    payload: data,
  };
};

export const getAllUserMessagesFail = (error) => {
  return {
    type: messageTypes.GET_ALL_USER_MESSAGES_FAIL,
    payload: error,
  };
};

// 1: Check if a conversation already exists between the user and the driver
// ... some magic happening in the back-end ...
// 2: Returns an object:
// {
//  conversationUrl,
//  messages: {
//   body
//   sender
//   status
//   conversationId
//  },
//  archived,
//  driverId,
//  userId
// }

export const startConversationRequested = () => {
  return {
    type: messageTypes.START_CONVERSATION_REQUEST,
  };
};

export const startConversation = (driverId, userId, rideId, bookingId) => {
  return (dispatch) => {
    dispatch(startConversationRequested());

    axios
      .post(URL_API + "/message/start-conversation", {
        driverId,
        userId,
        rideId,
        bookingId,
      })
      .then((response) => {
        // console.log(response.data);

        dispatch(startConversationSuccess(response.data));
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        // console.log(error);
        dispatch(setfeedback({ message, variant: "danger" }));
        dispatch(startConversationFail(error));
      });
  };
};

export const startConversationSuccess = (data) => {
  return {
    type: messageTypes.START_CONVERSATION_SUCCESS,
    payload: data,
  };
};

export const startConversationFail = (error) => {
  return {
    type: messageTypes.START_CONVERSATION_FAIL,
    payload: error,
  };
};

// Change conversation view

export const changeConversationView = (uuid) => {
  return {
    type: messageTypes.CHANGE_CONVERSATION_VIEW,
    payload: uuid,
  };
};

export const resetConversationView = () => {
  return {
    type: messageTypes.RESET_CONVERSATION_VIEW,
  };
};
