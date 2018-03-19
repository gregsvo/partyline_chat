import {
  ADD_MESSAGE,
  SET_CURRENT_USERID,
  ADD_HISTORY,
  ADD_USER,
  REMOVE_USER,
  ADD_TYPING_USER,
  REMOVE_TYPING_USER,
} from '../constants';

export function setCurrentUserId(userId) {
  return {
    type: SET_CURRENT_USERID,
    payload: userId,
  };
}

export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    payload: message,
  };
}

export function addHistory(messages, timestamp) {
  return {
    type: ADD_HISTORY,
    payload: {
      messages,
      timestamp,
    },
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

export function addTypingUser(userId) {
  return {
    type: ADD_TYPING_USER,
    payload: userId,
  };
}

export function removeTypingUser(userId) {
  return {
    type: REMOVE_TYPING_USER,
    payload: userId,
  };
}
