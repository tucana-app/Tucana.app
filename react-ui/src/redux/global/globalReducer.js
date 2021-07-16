import globalTypes from "./globalTypes";

const initialState = {
  supportedLanguagesCodes: ["en", "es", "fr", "de"],
  supportedLanguagesNames: ["English", "Español", "Français", "Deutsch"],
};

function globalReducer(state = initialState, action) {
  switch (action.type) {
    case globalTypes.SET_SUPPORTED_LANGUAGES_CODES:
      return {
        ...state,
      };
    case globalTypes.SET_SUPPORTED_LANGUAGES_NAMES:
      return {
        ...state,
      };

    default:
      return state;
  }
}

export default globalReducer;
