import adminTypes from "./adminTypes";

const initialState = {
  loadingUsersList: false,
  usersListData: [],
  usersListError: "",
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.GET_USERS_LIST_REQUEST:
      return {
        ...state,
        loadingUsersList: true,
        usersListData: [],
        usersListError: "",
      };

    case adminTypes.GET_USERS_LIST_SUCCESS:
      return {
        ...state,
        loadingUsersList: false,
        usersListData: action.payload,
        usersListError: "",
      };

    case adminTypes.GET_USERS_LIST_FAIL:
      return {
        ...state,
        loadingUsersList: false,
        usersListData: [],
        usersListError: action.payload,
      };

    default:
      return state;
  }
};

export default adminReducer;
