import { combineReducers } from "redux";

import userReducer from "./user/userReducer";
import messageReducer from "./message/messageReducer";
import adminReducer from "./admin/adminReducer";
import signupReducer from "./signup/signupReducer";
import globalReducer from "./global/globalReducer";
import rideReducer from "./ride/rideReducer";

const appReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  admin: adminReducer,
  signup: signupReducer,
  global: globalReducer,
  ride: rideReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
