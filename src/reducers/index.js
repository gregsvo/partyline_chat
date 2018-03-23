import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import messageReducer from './messages';
import userReducer from './users';

const rootReducer = combineReducers({
  messages: messageReducer,
  routing: routerReducer,
  users: userReducer,
});

export default rootReducer;
