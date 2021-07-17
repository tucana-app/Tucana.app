import globalTypes from "./globalTypes";

const initialState = {
  supportedLanguagesCodes: ["en", "es", "fr", "de"],
  supportedLanguagesNames: ["English", "Español", "Français", "Deutsch"],

  provinces: [
    "Alajuela",
    "Cartago",
    "Guanacaste",
    "Heredia",
    "Limón",
    "Puntarenas",
    "San José",
  ],
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
