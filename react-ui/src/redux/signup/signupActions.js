import signupTypes from "./signupTypes";
import axios from "axios";

const URL_API = process.env.REACT_APP_URL_API;

export const changeFormEmail = (data) => {
  return {
    type: signupTypes.CHANGE_FORM_EMAIL,
    payload: data,
  };
};

export const changeFormFirstName = (data) => {
  return {
    type: signupTypes.CHANGE_FORM_FIRSTNAME,
    payload: data,
  };
};

export const changeFormLastName = (data) => {
  return {
    type: signupTypes.CHANGE_FORM_LASTNAME,
    payload: data,
  };
};

export const changeFormUsername = (data) => {
  return {
    type: signupTypes.CHANGE_FORM_USERNAME,
    payload: data,
  };
};

export const changeFormDateOfBirth = (data) => {
  return {
    type: signupTypes.CHANGE_FORM_DATEOFBIRTH,
    payload: data,
  };
};

export const changeFormLanguage = (data) => {
  return {
    type: signupTypes.CHANGE_FORM_LANGUAGE,
    payload: data,
  };
};

export const changeFormPhoneNumber = (data) => {
  return {
    type: signupTypes.CHANGE_FORM_PHONENUMBER,
    payload: data,
  };
};

// Check USERNAME duplicate
export const checkDuplicateUsernameRequested = () => {
  return {
    type: signupTypes.CHECK_DUPLICATE_USERNAME_REQUESTED,
  };
};

export const checkDuplicateUsername = (username) => {
  return (dispatch) => {
    dispatch(checkDuplicateUsernameRequested());

    axios
      .get(URL_API + "/signup/check-duplicate-username", {
        params: {
          username,
        },
      })
      .then((response) => {
        dispatch(checkDuplicateUsernameSuccess(response.data));
      })
      .catch((error) => {
        // console.log(error.isUsernameDuplicate);
        dispatch(checkDuplicateUsernameFail(error));
      });
  };
};

export const checkDuplicateUsernameSuccess = (data) => {
  return {
    type: signupTypes.CHECK_DUPLICATE_USERNAME_SUCCESS,
    payload: {
      message: data.message,
      isUsernameDuplicate: data.isUsernameDuplicate,
    },
  };
};

export const checkDuplicateUsernameFail = (data) => {
  // console.log(data);
  return {
    type: signupTypes.CHECK_DUPLICATE_USERNAME_FAIL,
    payload: "Error checking username duplicates",
  };
};

// Check EMAIL duplicate
export const checkDuplicateEmailRequested = () => {
  return {
    type: signupTypes.CHECK_DUPLICATE_EMAIL_REQUESTED,
  };
};

export const checkDuplicateEmail = (email) => {
  return (dispatch) => {
    dispatch(checkDuplicateEmailRequested());

    axios
      .get(URL_API + "/signup/check-duplicate-email", {
        params: {
          email,
        },
      })
      .then((response) => {
        console.log(response.data);
        dispatch(checkDuplicateEmailSuccess(response.data));
      })
      .catch((error) => {
        // console.log(error.isEmailDuplicate);
        dispatch(checkDuplicateEmailFail(error));
      });
  };
};

export const checkDuplicateEmailSuccess = (data) => {
  return {
    type: signupTypes.CHECK_DUPLICATE_EMAIL_SUCCESS,
    payload: {
      message: data.message,
      isEmailDuplicate: data.isEmailDuplicate,
    },
  };
};

export const checkDuplicateEmailFail = (data) => {
  // console.log(data);
  return {
    type: signupTypes.CHECK_DUPLICATE_EMAIL_FAIL,
    payload: "Error checking email duplicates",
  };
};

// Check PHONENUMBER duplicate
export const checkDuplicatePhoneNumberRequested = () => {
  return {
    type: signupTypes.CHECK_DUPLICATE_PHONENUMBER_REQUESTED,
  };
};

export const checkDuplicatePhoneNumber = (phoneNumber) => {
  return (dispatch) => {
    dispatch(checkDuplicatePhoneNumberRequested());

    axios
      .get(URL_API + "/signup/check-duplicate-phonenumber", {
        params: {
          phoneNumber,
        },
      })
      .then((response) => {
        dispatch(checkDuplicatePhoneNumberSuccess(response.data));
      })
      .catch((error) => {
        // console.log(error.isPhoneNumberDuplicate);
        dispatch(checkDuplicatePhoneNumberFail(error));
      });
  };
};

export const checkDuplicatePhoneNumberSuccess = (data) => {
  return {
    type: signupTypes.CHECK_DUPLICATE_PHONENUMBER_SUCCESS,
    payload: {
      message: data.message,
      isPhoneNumberDuplicate: data.isPhoneNumberDuplicate,
    },
  };
};

export const checkDuplicatePhoneNumberFail = (data) => {
  // console.log(data);
  return {
    type: signupTypes.CHECK_DUPLICATE_PHONENUMBER_FAIL,
    payload: "Error checking phone number duplicates",
  };
};
