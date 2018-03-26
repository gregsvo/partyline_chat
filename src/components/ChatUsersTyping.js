import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChatUsersTyping extends Component {
  render() {
    // const userIdList = this.props.usersTyping;
    // const currentUserId = String(this.props.userId);
    // const typingUsers = '';
    const filteredUserIdList = this.filterUserIdList(this.props.usersTyping, String(this.props.userId));

    return (
      <div className="typing-indicator-box">
        <ul>
          {filteredUserIdList.join(', ') + (filteredUserIdList.length > 0 ? ' is typing' : '')}
        </ul>
      </div>
    );
  }
  filterUserIdList = (userIdList, userId) => {
    const index = userIdList.indexOf(userId);
    if (index > -1) {
      userIdList.splice(index, 1);
    }
    return userIdList;
  };
}

ChatUsersTyping.propTypes = {
  usersTyping: PropTypes.array,
  userId: PropTypes.number,
};

export default ChatUsersTyping;
