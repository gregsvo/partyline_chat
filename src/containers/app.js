import { connect } from 'react-redux';
import {
  addHistory,
  addMessage,
  addUser,
  removeUser,
  setCurrentUserId,
} from '../actions';import ChatHistory from '../components/ChatHistory';
import ChatInput from '../components/ChatInput';
import ChatUsers from '../components/chatUsers';
import React from 'react';
/* eslint-disable */


function mapStateToProps(state) {
  return {
    history: state.app.get('messages').toJS(),
    lastMessageTimestamp: state.app.get('lastMessageTimestamp'),
    userId: state.app.get('userId'),
    users: state.app.get('users').toJS(),

  };
}

function mapDispatchToProps(dispatch) {
  return {
    addHistory: (messages, timestamp) => dispatch(addHistory(messages, timestamp)),
    addMessage: (message) => dispatch(addMessage(message)),
    addUser: (userID) => dispatch(addUser(userID)),
    removeUser: (userID) => dispatch(removeUser(userID)),
    setUserId: (userId) => dispatch(setCurrentUserId(userId)),
  };
}

class App extends React.Component {

  static propTypes = {
    addHistory: React.PropTypes.func,
    addMessage: React.PropTypes.func,
    addUser: React.PropTypes.func,
    history: React.PropTypes.array,
    lastMessageTimestamp: React.PropTypes.string,
    removeUser: React.PropTypes.func,
    setUserId: React.PropTypes.func,
    userId: React.PropTypes.number,
    users: React.PropTypes.array,
  };

  state = {
    userId: Math.round(Math.random() * 1000000).toString(),
    history: [],
  };

  componentDidMount() {
    const ID = Math.round(Math.random() * 1000000);
    this.props.setUserId(ID);
    console.log("HERE IS WHERE WE INITIALIZE SENDBIRD")
    this.PubNub = PUBNUB.init({
      publish_key: 'pub-c-d03aa79b-aed8-46b3-b378-827c0f25a45c',
      subscribe_key: 'sub-c-c5dafafe-2871-11e8-844f-02fb5f0868fe',
      ssl: (location.protocol.toLowerCase() === 'https:'),
      uuid: ID,
    });
    console.log("HERE IS WHERE WE WIRE IN SENDBIRD TO SUBSCRIBE TO CHANNEL")
    this.PubNub.subscribe({
      channel: 'GregDemoChat',
      message: this.props.addMessage,
      presence: this.onPresenceChange,
    });
    this.fetchHistory();
    window.addEventListener('beforeunload', this.leaveChat);
  }

  componentWillUnmount() {
    this.leaveChat();
  }

  onPresenceChange = (presenceData) => {
    switch (presenceData.action) {
    case 'join':
      this.props.addUser(presenceData.uuid);
      break;
    case 'leave':
    case 'timeout':
    this.props.removeUser(presenceData.uuid);
      break;
    default:
      console.error('unknown action: ' + presenceData.action);
    }
  }

  render() {
    const { fetchHistory, props, sendMessage } = this;
    return (<div className="message-container">
      <ChatUsers users={ props.users } />
      <ChatHistory history={ props.history } fetchHistory={ fetchHistory } />
      <ChatInput userId={ props.userId } sendMessage={ sendMessage } />
    </div>);
  }

  leaveChat = () => {
    this.PubNub.unsubscribe({ channel: 'GregDemoChat' });
  }

  sendMessage = (message) => {
    console.log("HERE IS WHERE WE WIRE IN SENDBIRD TO SEND A MESSAGE.")
    console.log('HERE IS WHERE WE WILL PASS TO SENDBIRD BACKEND: ', message);
    this.PubNub.publish({
      channel: 'GregDemoChat',
      message: message,
    });
  };

  fetchHistory = () => {
    const { props } = this;
    console.log("HERE IS WHERE WE GET THE HISTORY OF MESSAGES FROM SENDBIRD")
    this.PubNub.history({
      channel: 'GregDemoChat',
      count: 30,
      start: props.lastMessageTimestamp,
      callback: (data) => {
        // data is Array(3), where index 0 is an array of messages
        // and index 1 and 2 are start and end dates of the messages
        const arrayOfMessages = data[0]
        const messagesStartDate = data[1]
        const messagesEndDate = data[2]
        props.addHistory(arrayOfMessages, messagesStartDate);
      },
    });
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
