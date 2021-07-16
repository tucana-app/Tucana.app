import adminTypes from "./adminTypes";
import axios from "axios";

const URL_API = process.env.REACT_APP_URL_API;

// Add a new favorite word

export const getUsersListRequested = () => {
  return {
    type: adminTypes.GET_USERS_LIST_REQUEST,
  };
};

export const getUsersList = () => {
  return (dispatch) => {
    dispatch(getUsersListRequested());

    axios
      .get(URL_API + "/manage/listUsers")
      .then((response) => {
        dispatch(getUsersListSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getUsersListFail(error));
      });
  };
};

export const getUsersListSuccess = (data) => {
  return {
    type: adminTypes.GET_USERS_LIST_SUCCESS,
    payload: data,
  };
};

export const getUsersListFail = (error) => {
  return {
    type: adminTypes.GET_USERS_LIST_FAIL,
    payload: error,
  };
};
