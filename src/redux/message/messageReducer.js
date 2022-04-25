import {
  CheckCircleFillIcon,
  CheckCircleIcon,
  CheckIcon,
} from "@primer/octicons-react";
import messageTypes from "./messageTypes";

const initialState = {
  isLoadingAllUserMessages: false,
  allUserMessagesData: [],
  allUserMessagesFail: "",

  isLoadingStartConversation: false,
  startConversationData: "",
  startConversationFail: "",
  currentView: 0,

  isLoadingUserNewMessages: false,
  userNewMessagesData: [],
  userNewMessagesError: "",

  isLoadingSendMessage: false,

  // 1: Sent
  // 2: Received
  // 3: Seen
  messageStatusIcon: (status) => {
    const variant = ["secondary", "seconday", "success"];

    switch (status) {
      case 1:
        return (
          <CheckIcon size={24} className={`text-${variant[status - 1]}`} />
        );

      case 2:
        return (
          <CheckCircleIcon
            size={24}
            className={`text-${variant[status - 1]}`}
          />
        );

      case 3:
        return (
          <CheckCircleFillIcon
            size={24}
            className={`text-${variant[status - 1]}`}
          />
        );

      default:
        break;
    }
  },
};

function messageReducer(state = initialState, action) {
  switch (action.type) {
    case messageTypes.GET_ALL_USER_MESSAGES_REQUEST:
      return {
        ...state,
        isLoadingAllUserMessages: true,
      };

    case messageTypes.GET_ALL_USER_MESSAGES_SUCCESS:
      return {
        ...state,
        isLoadingAllUserMessages: false,
        allUserMessagesData: action.payload,
        allUserMessagesFail: "",
      };

    case messageTypes.GET_ALL_USER_MESSAGES_FAIL:
      return {
        ...state,
        isLoadingAllUserMessages: false,
        allUserMessagesData: [],
        allUserMessagesFail: action.payload,
      };

    case messageTypes.START_CONVERSATION_REQUEST:
      return {
        ...state,
        isLoadingStartConversation: true,
      };

    case messageTypes.START_CONVERSATION_SUCCESS:
      return {
        ...state,
        isLoadingStartConversation: false,
        startConversationFail: "",
      };

    case messageTypes.START_CONVERSATION_FAIL:
      return {
        ...state,
        isLoadingStartConversation: false,
        startConversationFail: action.payload,
        currentView: 0,
      };

    case messageTypes.SEND_MESSAGE_REQUEST:
      return {
        ...state,
        isLoadingSendMessage: true,
      };

    case messageTypes.SEND_MESSAGE_END:
      return {
        ...state,
        isLoadingSendMessage: false,
      };

    case messageTypes.GET_USER_NEW_MESSAGES_REQUEST:
      return {
        ...state,
        isLoadingUserNewMessages: false,
      };

    case messageTypes.GET_USER_NEW_MESSAGES_SUCCESS:
      return {
        ...state,
        isLoadingUserNewMessages: true,
        userNewMessagesData: action.payload,
        userNewMessagesError: "",
      };

    case messageTypes.GET_USER_NEW_MESSAGES_FAIL:
      return {
        ...state,
        isLoadingUserNewMessages: false,
        userNewMessagesData: [],
        userNewMessagesError: action.payload,
      };

    case messageTypes.CHANGE_CONVERSATION_VIEW:
      return {
        ...state,
        currentView: action.payload,
      };

    case messageTypes.RESET_CONVERSATION_VIEW:
      return {
        ...state,
        currentView: 0,
      };

    default:
      return state;
  }
}

export default messageReducer;
