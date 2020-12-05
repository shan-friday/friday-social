import { GET_ERRORS,ERRORS_CLEANUP } from "../actions/types";

const initialState = {};

// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case ERRORS_CLEANUP:
      return {};
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}