import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ChatInput extends Component {
  componentDidMount() {
    this.refs.txtMessage.focus();
  }

  onSubmit = (event) => {
    event.preventDefault();

    // Check if the message is empty and return if so
    const message = this.refs.txtMessage.value;

    if (message.length === 0) {
      return;
    }

    // Build a message object and send it
    const messageObj = {
      Who: this.props.userId,
      What: message,
      When: new Date().valueOf(),
    };

    this.props.sendMessage(messageObj);
    // Clear the input field and set focus
    this.refs.txtMessage.value = '';
    this.refs.txtMessage.focus();
  };

  onChange = () => {
    const { resetStopTypingTimeout } = this;
    const { setTypingState } = this.props;
    const isInputEmpty = (this.refs.txtMessage.value.length === 0);
    // If the input isn't empty, and isTyping is false, update the state
    if (isInputEmpty === false) {
      // If the user wasn't typing before, and now the event has fired,
      // it means they are now typing
      if (this.isTyping === false) {
        this.isTyping = true;
        setTypingState(this.isTyping);
        // Start a 3 second countdown to see if they type within that window
        resetStopTypingTimeout();
      } else {
        // If the user typed another character, reset the timeout
        resetStopTypingTimeout();
      }
    } else {
      if (this.isTyping === true) {
        // If the user was typing, but now the input is empty,
        // it means they've deleted everything and that triggered
        // an onChange event.  For this, we state they have stopped typing
        this.isTyping = false;
        setTypingState(this.isTyping);
        // Stop the timeout, if there is one running
        if (this.stopTypingTimeout) {
          clearTimeout(this.stopTypingTimeout);
          this.stopTypingTimeout = undefined;
        }
      }
    }
  };

  render() {
    const { onChange, onSubmit } = this;
    return (
      <footer className="message-form">
        <form className="container" onSubmit={ onSubmit }>
          <div className="row">
            <div className="input-field col s10">
              <input ref="txtMessage" type="text" placeholder="Send a Message" onChange={ onChange }/>
            </div>
            <div className="input-field col s2">
              <button type="submit" className="waves-effect waves-light btn-floating btn-large">
                <i className="mdi-content-send" />
              </button>
            </div>
          </div>
        </form>
      </footer>
    );
  }
  isTyping = false;
  stopTypingTimeout = undefined;

  resetStopTypingTimeout = () => {
    const { stopTypingTimeout } = this;
    if (stopTypingTimeout) {
      clearTimeout(stopTypingTimeout);
    }
    this.stopTypingTimeout = setTimeout(() => {
      this.isTyping = false;
      this.props.setTypingState(this.isTyping);
      this.stopTypingTimeout = undefined;
    }, 3000);
  };
}

ChatInput.propTypes = {
  userId: PropTypes.number,
  sendMessage: PropTypes.func,
  setTypingState: PropTypes.func,
};
