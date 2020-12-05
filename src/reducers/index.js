import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import sessionReducer from "./sessionReducers";
import activityReducers from './activityReducers';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  sessions: sessionReducer,
  activity: activityReducers
});