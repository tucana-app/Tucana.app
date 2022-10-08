import { combineReducers } from "redux";

import userReducer from "./user/userReducer";
import notificationReducer from "./notification/notificationReducer";
import globalReducer from "./global/globalReducer";
import rideReducer from "./ride/rideReducer";
import toastReducer from "./toast/toastReducer";
import messageReducer from "./message/messageReducer";
import ratingReducer from "./rating/ratingReducer";
import bookingReducer from "./booking/bookingReducer";

const appReducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  global: globalReducer,
  ride: rideReducer,
  toast: toastReducer,
  message: messageReducer,
  rating: ratingReducer,
  booking: bookingReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    return appReducer(undefined, action);
  } else {
    return appReducer(state, action);
  }
};

export default rootReducer;
