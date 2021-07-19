import globalTypes from "./globalTypes";

const initialState = {
  supportedLanguagesCodes: ["en", "es", "fr", "de"],
  supportedLanguagesNames: ["English", "Español", "Français", "Deutsch"],

  provinces: [
    "Unknown",
    "Alajuela",
    "Cartago",
    "Guanacaste",
    "Heredia",
    "Limón",
    "Puntarenas",
    "San José",
  ],

  isEmptyObject: (obj) => {
    // because Object.keys(new Date()).length === 0;
    // we have to do some additional check
    return (
      obj && // 👈 null and undefined check
      Object.keys(obj).length === 0 &&
      obj.constructor === Object
    );
  },

  labelStringField: "You must enter a string",
  labelRequiredField: "This field is required",

  feedback: {},
};

function globalReducer(state = initialState, action) {
  switch (action.type) {
    case globalTypes.SET_GLOBAL_STATE:
      return {
        ...state,
      };

    case globalTypes.SET_FEEDBACK:
      return {
        ...state,
        feedback: action.payload,
        variant: action.payload.variant,
      };

    case globalTypes.CLEAR_FEEDBACK:
      return { ...state, feedback: {} };

    default:
      return state;
  }
}

export default globalReducer;
