import { faCheck, faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import messageTypes from "./messageTypes";

const initialState = {
  isLoadingAllUserMessages: false,
  allUserMessagesData: [],
  allUserMessagesFail: "",

  isLoadingStartConversation: false,
  startConversationData: "",
  startConversationFail: "",
  currentView: 0,

  // 1: Sent
  // 2: Received
  // 3: Seen

  messageStatusIcon: (status) => {
    const variant = ["secondary", "seconday", "success"];

    let icon = 0;

    switch (status) {
      case 1:
        icon = (
          <FontAwesomeIcon
            icon={faCheck}
            className={`text-${variant[status - 1]}`}
          />
        );
        break;

      case 2:
        icon = (
          <FontAwesomeIcon
            icon={faCheckDouble}
            className={`text-${variant[status - 1]}`}
          />
        );
        break;

      case 3:
        icon = (
          <FontAwesomeIcon
            icon={faCheckDouble}
            className={`text-${variant[status - 1]}`}
          />
        );
        break;

      default:
        break;
    }

    return icon;
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
        currentView: action.payload.UUID,
        startConversationFail: "",
      };

    case messageTypes.START_CONVERSATION_FAIL:
      return {
        ...state,
        isLoadingStartConversation: false,
        startConversationFail: action.payload,
        currentView: 0,
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
