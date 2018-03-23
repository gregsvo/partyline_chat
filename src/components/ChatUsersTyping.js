import React, { Component } from 'react';
import PropTypes from 'prop-types';
import removeCurrentUserFromList from '../utils/messaging';

class ChatUsersTyping extends Component {
  render() {
    const filteredUserList = removeCurrentUserFromList(this.props.usersTyping, this.props.userId);
    return (
      <div className="typing-indicator-box">
        <ul>{
          filteredUserList.map((userId) => {
            const imgURL = `//robohash.org/${userId}?set=set2&bgset=bg2&size=70x70`;
            return (
              <li key={ userId }>
                <img title={ userId } alt={ userId } src={ imgURL } className="circle" />
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </li>
            );
          })
        }</ul>
      </div>
    );
  }
}

ChatUsersTyping.propTypes = {
  usersTyping: PropTypes.array,
  userId: PropTypes.number,
};

export default ChatUsersTyping;
