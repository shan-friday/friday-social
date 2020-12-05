import {
  SET_CURRENT_USER,
  USER_LOADING,
  // EXTENSION_INSTALLED, 
  // EXTENSION_NOT_INSTALLED 
  UPDATE_FLOW
} from "../actions/types";

const isEmpty = require("is-empty");
const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  isExtensionInstalled: false,
  info: null
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    // case EXTENSION_INSTALLED:
    //   console.log('UPdated isExtension Installed');
    //   return {
    //     ...state,
    //     isExtensionInstalled: true
    //   };
    // case EXTENSION_NOT_INSTALLED:
    //   return {
    //     ...state,
    //     isExtensionInstalled: false
    //   };
    case UPDATE_FLOW:
      return {
        ...state,
        info: action.payload.info
      }
    default:
      return state;
  }
}