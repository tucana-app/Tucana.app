import adminTypes from "./adminTypes";

const initialState = {
  isLoadingUsers: false,
  usersData: [],
  usersError: "",
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.GET_USERS_REQUEST:
      return {
        ...state,
        isLoadingUsers: true,
      };

    case adminTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        isLoadingUsers: false,
        usersData: action.payload,
        usersError: "",
      };

    case adminTypes.GET_USERS_FAIL:
      return {
        ...state,
        isLoadingUsers: false,
        usersData: [],
        usersError: action.payload,
      };

    default:
      return state;
  }
};

export default adminReducer;
