import { ADD_HISTORY, ADD_MESSAGE, SET_CURRENT_USERID } from '../constants';

export function addHistory(messages, timestamp) {
  return {
    type: ADD_HISTORY,
    payload: {
      messages,
      timestamp,
    },
  };
}

export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    payload: message,
  };
}

export function setCurrentUserId(userId) {
  return {
    type: SET_CURRENT_USERID,
    payload: userId,
  };
}
