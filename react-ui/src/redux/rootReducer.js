import { combineReducers } from "redux";

import userReducer from "./user/userReducer";
import notificationReducer from "./notification/notificationReducer";
import adminReducer from "./admin/adminReducer";
import globalReducer from "./global/globalReducer";
import rideReducer from "./ride/rideReducer";
import emailReducer from "./email/emailReducer";
import toastReducer from "./toast/toastReducer";
import messageReducer from "./message/messageReducer";
import ratingReducer from "./rating/ratingReducer";

const appReducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  admin: adminReducer,
  global: globalReducer,
  ride: rideReducer,
  email: emailReducer,
  toast: toastReducer,
  message: messageReducer,
  rating: ratingReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    return appReducer(undefined, action);
  } else {
    return appReducer(state, action);
  }
};

export default rootReducer;
