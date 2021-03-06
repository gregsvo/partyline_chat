import {
  SET_CURRENT_USERID,
  ADD_USER,
  REMOVE_USER,
  ADD_TYPING_USER,
  REMOVE_TYPING_USER,
} from '../constants';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  userId: 0,
  users: [],
  usersTyping: [],
});

function usersReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
  case SET_CURRENT_USERID:
    return state.update('userId', () => action.payload);
  case ADD_USER:
    return state
      .update('users', (users) => (users.indexOf(action.payload) >= 0 ? users : users.concat(action.payload)));
  case REMOVE_USER:
    return state
      .update('users', (users) => users.filter((userId) => userId !== action.payload));
  case ADD_TYPING_USER:
    return state
      .update('usersTyping', (users) => (users.indexOf(action.payload) >= 0 ? users : users.concat(action.payload)));
  case REMOVE_TYPING_USER:
    return state
      .update('usersTyping', (users) => users.filter((userId) => userId !== action.payload));
  default:
    return state;
  }
}

export default usersReducer;
