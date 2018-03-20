import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChatUsers extends Component {
  render() {
    const { users } = this.props;
    return (
      <div className="online-user-list">
        <div className="online-users-number valign-wrapper">
          {/* <i className="material-icons">people</i> */}
          <span className="valign">{ users.length } online</span>
        </div>
        <ul>{
          users.map((userId) => {
            const name = userId;
            const imgURL = '//robohash.org/' + userId + '?set=set2&bgset=bg2&size=70x70';
            return (
              <li key={ userId }>
                <img title={ name } alt={ name } src={ imgURL } className="circle" />
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
};

export default ChatUsers;
