import adminTypes from "./adminTypes";

const initialState = {
  loadingUsers: false,
  usersData: [],
  usersError: "",
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case adminTypes.GET_USERS_REQUEST:
      return {
        ...state,
        loadingUsers: true,
      };

    case adminTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        loadingUsers: false,
        usersData: action.payload,
        usersError: "",
      };

    case adminTypes.GET_USERS_FAIL:
      return {
        ...state,
        loadingUsers: false,
        usersData: [],
        usersError: action.payload,
      };

    default:
      return state;
  }
};

export default adminReducer;
