import {
  ADD_HISTORY,
  ADD_MESSAGE,
  ADD_USER,
  REMOVE_USER,
  SET_CURRENT_USERID,
} from '../constants';

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

export function addUser(userId) {
  return {
    type: ADD_USER,
    payload: userId,
  };
}

export function removeUser(userId) {
  return {
    type: REMOVE_USER,
    payload: userId,
  };
}
