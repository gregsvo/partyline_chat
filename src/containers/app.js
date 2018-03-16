import ChatHistory from '../components/ChatHistory';
import ChatInput from '../components/ChatInput';
import React from 'react';

class App extends React.Component {

  state = {
    userId: Math.round(Math.random() * 1000000).toString(),
    history: [],
  };

  componentDidMount() {
    /* eslint-disable */
    console.log("HERE IS WHERE WE INITIALIZE SENDBIRD")
    this.PubNub = PUBNUB.init({
      publish_key: 'pub-c-d03aa79b-aed8-46b3-b378-827c0f25a45c',
      subscribe_key: 'sub-c-c5dafafe-2871-11e8-844f-02fb5f0868fe',
      ssl: (location.protocol.toLowerCase() === 'https:'),
    });

    console.log("HERE IS WHERE WE WIRE IN SENDBIRD TO SUBSCRIBE TO CHANNEL")
    this.PubNub.subscribe({
      channel: 'GregDemoChat',
      message: (message) => this.setState({
        history: this.state.history.concat(message),
      }),
    });
  }

  render() {
    const { sendMessage, state } = this;
    return (
      <div>
        <ChatHistory history={ state.history } />
        <ChatInput userId = { state.userId } sendMessage = { sendMessage }/>
      </div>
    );
  }

  sendMessage = (message) => {
    console.log("HERE IS WHERE WE WIRE IN SENDBIRD TO SEND A MESSAGE.")
    console.log('sendMessage will now pass to backend: ', message);
    this.PubNub.publish({
      channel: 'GregDemoChat',
      message: message,
    });
  };

}

export default App;
