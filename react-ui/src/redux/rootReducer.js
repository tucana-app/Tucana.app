import { combineReducers } from "redux";

import userReducer from "./user/userReducer";
import notificationReducer from "./notification/notificationReducer";
import adminReducer from "./admin/adminReducer";
import globalReducer from "./global/globalReducer";
import rideReducer from "./ride/rideReducer";

const appReducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  admin: adminReducer,
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
