import globalTypes from "./globalTypes";
import axios from "axios";

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

export const displayNavBar = (isDisplay) => {
  return {
    type: globalTypes.DISPLAY_NAV_BAR,
    payload: isDisplay,
  };
};
