import { combineReducers } from "redux";

import userReducer from "./user/userReducer";
import messageReducer from "./message/messageReducer";
import manageReducer from "./manage/manageReducer";

const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  manage: manageReducer,
});

export default rootReducer;
