import React, { Component } from 'react';
import PropTypes from 'prop-types';
import removeCurrentUserFromList from '../utils/messaging';


class ChatUsers extends Component {
  render() {
    const filteredUserList = removeCurrentUserFromList(this.props.users, this.props.userId);
    return (
      <div className="online-user-list">
        <ul>{
          filteredUserList.map((userId) => {
            const imgURL = `//robohash.org/${userId}?set=set2&bgset=bg2&size=70x70`;
            return (
              <li key={ userId }>
                <img title={ userId } alt={ userId } src={ imgURL } className="circle" />
              </li>
            );
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
