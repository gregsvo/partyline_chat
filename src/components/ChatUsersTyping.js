import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChatUsersTyping extends Component {
  render() {
    const { usersTyping } = this.props;
    return (
      <div className="typing-indicator-box">
        <ul>{
          usersTyping.map((userId) => {
            const name = userId;
            const imgURL = '//robohash.org/' + userId + '?set=set2&bgset=bg2&size=70x70';
            return (
              <li key={ userId }>
                <img title={ name } alt={ name } src={ imgURL } className="circle" />
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
};

export default ChatUsersTyping;
