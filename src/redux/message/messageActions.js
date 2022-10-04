import messageTypes from "./messageTypes";
import axios from "axios";
import { setToast } from "../index";
import { parseText } from "../../helpers";
import authHeader from "../../helpers/authHeader";

const URL_API = process.env.REACT_APP_URL_API;

// Get all user's messages

export const getAllUserMessagesRequested = () => {
  return {
    type: messageTypes.GET_ALL_USER_MESSAGES_REQUEST,
  };
};

export const getAllUserMessages = (user) => {
  return (dispatch) => {
    dispatch(getAllUserMessagesRequested());

    axios
      .get(URL_API + "/message/all-user-messages", {
        headers: authHeader(),
        params: {
          user,
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
        dispatch(
          setToast({
            show: true,
            headerText: "Error",
            bodyText: message,
            variant: "danger",
          })
        );
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

export const startConversation = (driverId, user, rideId) => {
  return (dispatch) => {
    dispatch(startConversationRequested());

    axios
      .post(
        URL_API + "/message/start-conversation",
        {
          driverId,
          userId: user.id,
          rideId,
        },
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        // console.log(response.data);

        dispatch(getAllUserMessages(user));

        // The response is the UUID of the conversation
        dispatch(
          changeConversationView(
            response.data.uuid,
            user.id,
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
        dispatch(
          setToast({
            show: true,
            headerText: "Error",
            bodyText: message,
            variant: "danger",
          })
        );
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

export const sendMessage = (
  sender,
  receiverId,
  message,
  conversationId,
  googleMapsLink
) => {
  return (dispatch) => {
    if (message.length !== 0) {
      dispatch(sendMessageRequested());

      let parsingResult = {};

      if (googleMapsLink) {
        parsingResult = { value: 0 };
      } else {
        parsingResult = parseText(message);
      }

      if (parsingResult.value === 0) {
        axios
          .post(
            URL_API + "/message/send-message",
            {
              senderId: sender.id,
              receiverId,
              message,
              conversationId,
            },
            {
              headers: authHeader(),
            }
          )
          .then((response) => {
            // console.log(response.data);

            dispatch(
              setToast({
                show: true,
                headerText: "Success",
                bodyText: "Message sent",
                variant: "success",
              })
            );
            dispatch(sendMessageEnd());
            dispatch(getAllUserMessages(sender));
          })
          .catch((error) => {
            // console.log(error)
            dispatch(sendMessageEnd());
          });
      } else {
        dispatch(
          setToast({
            show: true,
            headerText: "Warning",
            bodyText: parsingResult.message,
            variant: "warning",
          })
        );

        dispatch(sendMessageEnd());
      }
    }
  };
};

export const sendMessageEnd = () => {
  return {
    type: messageTypes.SEND_MESSAGE_END,
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
        headers: authHeader(),
        params: {
          userId,
        },
      })
      .then((response) => {
        // console.log(response.data);

        dispatch(getUserNewMessagesSuccess(response.data));
      })
      .catch((error) => {
        // console.log(error);

        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch(getUserNewMessagesFail(message));
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
      .put(
        URL_API + "/message/set-messages-seen",
        {
          viewerId,
          conversationId,
        },
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        // console.log(response.data);
        // Message successfully set as "Seen"
        dispatch(getUserNewMessages(viewerId));
      });
  };
};

export const resetConversationView = (viewerId) => {
  return (dispatch) => {
    // Change view before making an API call
    dispatch({
      type: messageTypes.RESET_CONVERSATION_VIEW,
    });
  };
};
