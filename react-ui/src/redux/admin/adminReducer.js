import adminTypes from "./adminTypes";

const initialState = {
  isLoadingUsers: false,
  usersData: [],
  usersError: "",

  isLoadingUsersConversations: false,
  usersConversationsData: [],
  usersConversationsError: "",
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.ADMIN_GET_USERS_REQUEST:
      return {
        ...state,
        isLoadingUsers: true,
      };

    case adminTypes.ADMIN_GET_USERS_SUCCESS:
      return {
        ...state,
        isLoadingUsers: false,
        usersData: action.payload,
        usersError: "",
      };

    case adminTypes.ADMIN_GET_USERS_FAIL:
      return {
        ...state,
        isLoadingUsers: false,
        usersData: [],
        usersError: action.payload,
      };

    case adminTypes.ADMIN_GET_USERS_CONVERSATIONS_REQUEST:
      return {
        ...state,
        isLoadingUsersConversations: true,
      };

    case adminTypes.ADMIN_GET_USERS_CONVERSATIONS_SUCCESS:
      return {
        ...state,
        isLoadingUsersConversations: false,
        usersConversationsData: action.payload,
        usersConversationsError: "",
      };

    case adminTypes.ADMIN_GET_USERS_CONVERSATIONS_FAIL:
      return {
        ...state,
        isLoadingUsersConversations: false,
        usersConversationsData: [],
        usersConversationsError: action.payload,
      };

    default:
      return state;
  }
};

export default adminReducer;
