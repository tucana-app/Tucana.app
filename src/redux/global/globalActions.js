import globalTypes from "./globalTypes";
import axios from "axios";
import {
  // updateUser,
  logout,
} from "../index";
import authHeader from "../../helpers/authHeader";

const URL_API = process.env.REACT_APP_URL_API;

// Set global state

export const setGlobalState = (height) => {
  const constants = JSON.parse(localStorage.getItem("constants"));

  return {
    type: globalTypes.SET_GLOBAL_STATE,
    payload: { height, constants },
  };
};

// Get the constants

export const getConstantsRequested = () => {
  return {
    type: globalTypes.GET_CONSTANTS_REQUEST,
  };
};

export const getConstants = () => {
  return (dispatch) => {
    dispatch(getConstantsRequested());

    axios
      .get(URL_API + "/global/constants", { headers: authHeader() })
      .then((response) => {
        // console.log(response.data);

        // Just update the user in case there are changed in the database
        // const user = JSON.parse(localStorage.getItem("user"));

        const currentConstants = JSON.parse(localStorage.getItem("constants"));
        const constants = response.data.reduce(
          (obj, cur) => ({ ...obj, [cur.key]: cur.value }),
          {}
        );

        if (currentConstants) {
          if (currentConstants.USER_VERSION !== constants.USER_VERSION) {
            // console.log("Update needed");

            // Just update the user in case there are changed in the database
            // dispatch(updateUser(user.id));

            // Or simply logout the user to apply changes on the next login
            dispatch(logout());
          } else {
            // console.log("No update necessary");
          }
        }

        localStorage.setItem("constants", JSON.stringify(constants));

        dispatch(getConstantsSuccess(constants));
      })
      .catch((error) => {
        // console.log(error);

        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        dispatch(getConstantsFail(message));
      });
  };
};

export const getConstantsSuccess = (data) => {
  return {
    type: globalTypes.GET_CONSTANTS_SUCCESS,
    payload: data,
  };
};

export const getConstantsFail = (error) => {
  return {
    type: globalTypes.GET_CONSTANTS_FAIL,
    payload: error,
  };
};

// Get all countries

export const getCountriesRequested = () => {
  return {
    type: globalTypes.GET_COUNTRIES_REQUEST,
  };
};

export const getCountries = (userId) => {
  return (dispatch) => {
    dispatch(getCountriesRequested());

    axios
      .get("https://restcountries.com/v3.1/all?fields=name,flags,cca2", {
        params: {
          userId,
        },
      })
      .then((response) => {
        // console.log(response.data);
        dispatch(getCountriesSuccess(response.data));
      })
      .catch((error) => {
        // console.log(error)
      });
  };
};

export const getCountriesSuccess = (data) => {
  return {
    type: globalTypes.GET_COUNTRIES_SUCCESS,
    payload: data,
  };
};

// Display the navigation bar conditionnally

export const displayNavBar = (isDisplay) => {
  return {
    type: globalTypes.DISPLAY_NAV_BAR,
    payload: isDisplay,
  };
};

// Get levels

export const getLevelsRequested = () => {
  return {
    type: globalTypes.GET_LEVELS_REQUEST,
  };
};

export const getLevels = () => {
  return (dispatch) => {
    dispatch(getLevelsRequested());

    axios
      .get(URL_API + "/global/levels", { headers: authHeader() })
      .then((response) => {
        // console.log(response.data);
        dispatch(getLevelsSuccess(response.data));
      })
      .catch((error) => {
        // console.log(error)
      });
  };
};

export const getLevelsSuccess = (levels) => {
  return {
    type: globalTypes.GET_LEVELS_SUCCESS,
    payload: levels,
  };
};

export const getLevelsError = (error) => {
  return {
    type: globalTypes.GET_LEVELS_SUCCESS,
    payload: error,
  };
};

export const sendErrorReport = (message, stack) => {
  return (dispatch) => {
    dispatch(getCountriesRequested());

    axios
      .post(
        URL_API + "/global/error",
        { message, stack },
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        // console.log(response.data);
        dispatch(getCountriesSuccess(response.data));
      })
      .catch((error) => {
        // console.log(error)
      });
  };
};
