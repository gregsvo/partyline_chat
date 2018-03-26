import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import formatMessageDate from '../utils/messaging';

class ChatHistory extends Component {
  constructor() {
    super();
    this.state = { loadedAvatars: [] };
  }

  componentWillUpdate(nextProps) {
    this.historyChanged = nextProps.history.length !== this.props.history.length;
    if (this.historyChanged) {
      const { messageList } = this.refs;
      const scrollPos = messageList.scrollTop;
      const scrollBottom = (messageList.scrollHeight - messageList.clientHeight);
      const scrollAcceptablyClose = (scrollPos > (scrollBottom - 5) && scrollPos < (scrollBottom + 5));
      this.scrollAtBottom = (scrollBottom === 0) || (scrollAcceptablyClose);
      if (!this.scrollAtBottom) {
        const numMessages = messageList.childNodes.length;
        this.topMessage = numMessages === 0 ? null : messageList.childNodes[0];
      }
    }
  }

  componentDidUpdate() {
    if (this.historyChanged && this.scrollAtBottom)  {
      this.scrollToBottom();
    }
  }

  onScroll = () => {
    const { refs, props } = this;
    const scrollTop = refs.messageList.scrollTop;
    if (scrollTop === 0) {
      props.fetchHistory();
    }
  };

  render() {
    const { props, onScroll } = this;
    return (
      <ul className="collection message-list" ref="messageList" onScroll={ onScroll }>
        { props.history.map((messageObj) => {
          const messageDate = formatMessageDate(messageObj.When);
          const imgURL = `//robohash.org/${messageObj.Who}?set=set2&bgset=bg2&size=70x70`;
          return (
            <li className="collection-item message-item avatar" key={ messageObj.When }>
              <img className="img-circle img-circle-md pull-left mr-sm" alt={ messageObj.Who } src={ imgURL }/>
              <span className="title">{ messageObj.Who }</span>
              <p>
                <span className="message-date">{ messageDate }</span>
                <br />
                <span className="message-text">{ messageObj.What }</span>
              </p>
            </li>
          );
        }) }
      </ul>
    );
  }

  static scrollAtBottom = true;

  scrollToBottom = () => {
    const { messageList } = this.refs;
    const scrollHeight = messageList.scrollHeight;
    const height = messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

}

ChatHistory.propTypes = {
  history: PropTypes.array,
  fetchHistory: PropTypes.func,
};

export default ChatHistory;
