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
};

function globalReducer(state = initialState, action) {
  switch (action.type) {
    case globalTypes.SET_GLOBAL_STATE:
      return {
        ...state,
      };

    default:
      return state;
  }
}

export default globalReducer;
