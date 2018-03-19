import {
  ADD_HISTORY,
  ADD_MESSAGE,
  ADD_USER,
  REMOVE_USER,
  SET_CURRENT_USERID,
} from '../constants';

import { fromJS } from 'immutable';


const INITIAL_STATE = fromJS({
  lastMessageTimestamp: null,
  messages: [],
  userId: 0,
  users: [],
});

function appReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
  case ADD_USER:
    return state
      .update('users', (users) => (users.indexOf(action.payload) >= 0 ? users : users.concat(action.payload)));
  case REMOVE_USER:
    return state
      .update('users', (users) => users.delete(action.payload));
  case ADD_HISTORY:
    return state
    .update('messages', (messages) => messages.unshift(...action.payload.messages))
    .update('lastMessageTimestamp', () => action.payload.timestamp);
  case ADD_MESSAGE:
    return state
      .update('messages', (messages) => messages.concat(action.payload));
  case SET_CURRENT_USERID:
    return state
      .update('userId', () => action.payload); // immutableJS (https://facebook.github.io/immutable-js/docs/#/List/update)
  default:
    return state;
  }
}

export default appReducer;
