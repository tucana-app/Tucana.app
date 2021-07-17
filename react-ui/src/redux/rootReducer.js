import { combineReducers } from "redux";

import userReducer from "./user/userReducer";
import messageReducer from "./message/messageReducer";
import adminReducer from "./admin/adminReducer";
import signupReducer from "./signup/signupReducer";
import globalReducer from "./global/globalReducer";
import rideReducer from "./ride/rideReducer";

const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
  admin: adminReducer,
  signup: signupReducer,
  global: globalReducer,
  ride: rideReducer,
});

export default rootReducer;
