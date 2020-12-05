import { SET_SESSION_ID, REMOVE_SESSION_ID, JOIN_SESSION_ID } from '../actions/types';

const isEmpty = require("is-empty");
const initialState = {
  isInSession: false,
  sessionId: 0,
  user: {}
};

// eslint-disable-next-line
export default function (state = initialState, action) {
    switch (action.type) {
      case SET_SESSION_ID:
        return {
          ...state,
          isInSession: !isEmpty(action.payload),
          sessionId: action.payload.sessionId,
          user: action.payload.user
        };
      case REMOVE_SESSION_ID:
        return {
            isInSession: false,
            sessionId: 0,
            user: {}
          };
        case JOIN_SESSION_ID:
          return {
            isInSession: false,
            sessionId: action.payload.sessionId,
            user: {}
          }
      default:
        return state;
    }
  }