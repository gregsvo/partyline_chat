import { connect } from 'react-redux';
import { addHistory, addMessage, setCurrentUserId } from '../actions';
import ChatHistory from '../components/ChatHistory';
import ChatInput from '../components/ChatInput';
import React from 'react';
/* eslint-disable */


function mapStateToProps(state) {
  return {
    history: state.app.get('messages').toJS(),
    lastMessageTimestamp: state.app.get('lastMessageTimestamp'),
    userId: state.app.get('userId'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addHistory: (messages, timestamp) => dispatch(addHistory(messages, timestamp)),
    addMessage: (message) => dispatch(addMessage(message)),
    setUserId: (userId) => dispatch(setCurrentUserId(userId)),
  };
}

class App extends React.Component {

  static propTypes = {
    addHistory: React.PropTypes.func,
    addMessage: React.PropTypes.func,
    history: React.PropTypes.array,
    lastMessageTimestamp: React.PropTypes.string,
    setUserId: React.PropTypes.func,
    userId: React.PropTypes.number,
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
    });

    console.log("HERE IS WHERE WE WIRE IN SENDBIRD TO SUBSCRIBE TO CHANNEL")
    this.PubNub.subscribe({
      channel: 'GregDemoChat',
      message: this.props.addMessage,
    });
    this.fetchHistory();
  }

  render() {
    const { props, sendMessage } = this;
    return (<div>
      <ChatHistory history={ props.history } />
      <ChatInput userId={ props.userId } sendMessage={ sendMessage } />
    </div>);
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
