import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChatUsers extends Component {
  render() {
    const { users } = this.props;
    const currentUserId = this.props.userId;
    return (
      <div className="online-user-list">
        <ul>{
          users.map((userId) => {
            if (userId !== String(currentUserId)) {
              const imgURL = `//robohash.org/${userId}?set=set2&bgset=bg2&size=70x70`;
              return (
                <li key={ userId }>
                  <img title={ userId } alt={ userId } src={ imgURL } className="circle" />
                </li>
              );
            }
            return '';
          })
        }</ul>
      </div>
    );
  }
}

ChatUsers.propTypes = {
  users: PropTypes.array,
  userId: PropTypes.number,
};

export default ChatUsers;
