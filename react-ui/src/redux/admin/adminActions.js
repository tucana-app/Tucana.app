import adminTypes from "./adminTypes";
import axios from "axios";

const URL_API = process.env.REACT_APP_URL_API;

// Add a new favorite word

export const getUsersRequested = () => {
  return {
    type: adminTypes.GET_USERS_REQUEST,
  };
};

export const getUsers = (userId) => {
  return (dispatch) => {
    if (userId === 1) {
      dispatch(getUsersRequested());

      axios
        .get(URL_API + "/admin/list-users")
        .then((response) => {
          dispatch(getUsersSuccess(response.data));
        })
        .catch((error) => {
          dispatch(getUsersFail(error));
        });
    } else {
      dispatch(getUsersFail("Not autorized"));
    }
  };
};

export const getUsersSuccess = (data) => {
  return {
    type: adminTypes.GET_USERS_SUCCESS,
    payload: data,
  };
};

export const getUsersFail = (error) => {
  return {
    type: adminTypes.GET_USERS_FAIL,
    payload: error,
  };
};
