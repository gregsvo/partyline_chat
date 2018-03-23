import {
  ADD_MESSAGE,
  ADD_HISTORY,
} from '../constants';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  messages: [],
  lastMessageTimestamp: null,
});

function messageReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
  case ADD_MESSAGE:
    return state.update('messages', (messages) => messages.concat(action.payload));
  case ADD_HISTORY:
    return state
      .update('messages', (messages) => messages.unshift(...action.payload.messages))
      .update('lastMessageTimestamp', () => action.payload.timestamp);
  default:
    return state;
  }
}

export default messageReducer;
