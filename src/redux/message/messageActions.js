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

export const startConversation = (
  driverId,
  userId,
  rideId,
  bookingId,
  viewerId
) => {
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

        dispatch(getAllUserMessages(viewerId));

        // receiving the UUID
        dispatch(
          changeConversationView(
            response.data.uuid,
            viewerId,
            response.data.conversationId
          )
        );

        dispatch(startConversationSuccess());
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

export const startConversationSuccess = () => {
  return {
    type: messageTypes.START_CONVERSATION_SUCCESS,
  };
};

export const startConversationFail = (error) => {
  return {
    type: messageTypes.START_CONVERSATION_FAIL,
    payload: error,
  };
};

// Send a message

export const sendMessageRequested = () => {
  return {
    type: messageTypes.SEND_MESSAGE_REQUEST,
  };
};

export const sendMessage = (senderId, receiverId, message, conversationId) => {
  return (dispatch) => {
    dispatch(sendMessageRequested());

    axios
      .post(URL_API + "/message/send-message", {
        senderId,
        receiverId,
        message,
        conversationId,
      })
      .then((response) => {
        // console.log(response.data);

        dispatch(
          setfeedback({ message: response.data.message, variant: "success" })
        );

        dispatch(sendMessageResponse(message));
        dispatch(getAllUserMessages(senderId));
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

        dispatch(sendMessageResponse(message));
      });
  };
};

export const sendMessageResponse = (response) => {
  return {
    type: messageTypes.SEND_MESSAGE_RESPONSE,
    payload: response.message,
  };
};

// Get all new user's messages

export const getUserNewMessagesRequested = () => {
  return {
    type: messageTypes.GET_USER_NEW_MESSAGES_REQUEST,
  };
};

export const getUserNewMessages = (userId) => {
  return (dispatch) => {
    dispatch(getUserNewMessagesRequested());

    axios
      .get(URL_API + "/message/user-new-messages", {
        params: {
          userId,
        },
      })
      .then((response) => {
        // console.log(response.data);

        dispatch(getUserNewMessagesSuccess(response.data));
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
      });
  };
};

export const getUserNewMessagesSuccess = (data) => {
  return {
    type: messageTypes.GET_USER_NEW_MESSAGES_SUCCESS,
    payload: data,
  };
};

export const getUserNewMessagesFail = (error) => {
  return {
    type: messageTypes.GET_USER_NEW_MESSAGES_SUCCESS,
    payload: error,
  };
};

// Change conversation view and change messages' status as "Seen" (id = 3)

export const changeConversationView = (uuid, viewerId, conversationId) => {
  return (dispatch) => {
    // Change view before making an API call
    dispatch({
      type: messageTypes.CHANGE_CONVERSATION_VIEW,
      payload: uuid,
    });

    axios
      .put(URL_API + "/message/set-messages-seen", { viewerId, conversationId })
      .then((response) => {
        // console.log(response.data);
        // Message successfully set as "Seen"
        dispatch(getUserNewMessages(viewerId));
      })
      .catch((error) => {
        // A problem happened while setting the message as "Seen"
        //
        // const message =
        //   (error.response &&
        //     error.response.data &&
        //     error.response.data.message) ||
        //   error.message ||
        //   error.toString();
        //
        // console.log(message);
      });
  };
};

export const resetConversationView = (viewerId) => {
  return (dispatch) => {
    // Change view before making an API call
    dispatch(getAllUserMessages(viewerId));

    dispatch({
      type: messageTypes.RESET_CONVERSATION_VIEW,
    });
  };
};