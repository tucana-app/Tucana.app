import adminTypes from "./adminTypes";
import axios from "axios";

const URL_API = process.env.REACT_APP_URL_API;

// An admin is requesting the list of all users

export const admin_getUsersRequested = () => {
  return {
    type: adminTypes.ADMIN_GET_USERS_REQUEST,
  };
};

export const admin_getUsers = (currentUser) => {
  return (dispatch) => {
    if (currentUser.adminId) {
      dispatch(admin_getUsersRequested());

      axios
        .get(URL_API + "/admin/list-users")
        .then((response) => {
          dispatch(admin_getUsersSuccess(response.data));
        })
        .catch((error) => {
          dispatch(admin_getUsersFail(error));
        });
    } else {
      dispatch(admin_getUsersFail("Not autorized"));
    }
  };
};

export const admin_getUsersSuccess = (data) => {
  return {
    type: adminTypes.ADMIN_GET_USERS_SUCCESS,
    payload: data,
  };
};

export const admin_getUsersFail = (error) => {
  return {
    type: adminTypes.ADMIN_GET_USERS_FAIL,
    payload: error,
  };
};

// An admin is requesting the list of all conversations

export const admin_getUsersConversationsRequested = () => {
  return {
    type: adminTypes.ADMIN_GET_USERS_CONVERSATIONS_REQUEST,
  };
};

export const admin_getUsersConversations = (currentUser) => {
  return (dispatch) => {
    if (currentUser.adminId) {
      dispatch(admin_getUsersConversationsRequested());

      axios
        .get(URL_API + "/admin/users-conversations")
        .then((response) => {
          dispatch(admin_getUsersConversationsSuccess(response.data));
        })
        .catch((error) => {
          dispatch(admin_getUsersConversationsFail(error));
        });
    } else {
      dispatch(admin_getUsersConversationsFail("Not autorized"));
    }
  };
};

export const admin_getUsersConversationsSuccess = (data) => {
  return {
    type: adminTypes.ADMIN_GET_USERS_CONVERSATIONS_SUCCESS,
    payload: data,
  };
};

export const admin_getUsersConversationsFail = (error) => {
  return {
    type: adminTypes.ADMIN_GET_USERS_CONVERSATIONS_FAIL,
    payload: error,
  };
};
