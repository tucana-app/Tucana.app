import { combineReducers } from "redux";

import userReducer from "./user/userReducer";
import messageReducer from "./message/messageReducer";
import manageReducer from "./manage/manageReducer";
import signupReducer from "./signup/signupReducer";
import globalReducer from "./global/globalReducer";

const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  manage: manageReducer,
  signup: signupReducer,
  global: globalReducer,
});

export default rootReducer;
