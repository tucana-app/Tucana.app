import toastTypes from "./toastTypes";

const initialState = {
  show: false,
  headerText: "",
  bodyText: "",
  variant: "",
};

const toastReducer = (state = initialState, action) => {
  switch (action.type) {
    case toastTypes.SET_TOAST:
      return {
        ...state,
        show: action.payload.show,
        headerText: action.payload.headerText,
        bodyText: action.payload.bodyText,
        variant: action.payload.variant,
      };

    default:
      return state;
  }
};

export default toastReducer;
