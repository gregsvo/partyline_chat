import * as React from 'react';

export default class ChatInput extends React.Component {
  static propTypes = {
    userId: React.PropTypes.string,
    sendMessage: React.PropTypes.func,
  };

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

  render() {
    // const { props, onSubmit } = this;
    const { onSubmit } = this;
    // const imgURL = `//robohash.org/${props.userId}?set=set2&bgset=bg2&size=70x70`;
    return (
      <footer className="teal">
        <form className="container" onSubmit={ onSubmit }>
          <div className="row">
            <div className="input-field col s10">
              {/* <i className="prefix mdi-communication-chat" /> */}
              <input ref="txtMessage" type="text" placeholder="Send a Message" />
              {/* <span className="chip left">
                <img src={ imgURL } />
                <span>User: { props.userId }</span>
              </span> */}
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
}
