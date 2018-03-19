import * as React from 'react';

class ChatUsersTyping extends React.Component {
  static propTypes = {
    usersTyping: React.PropTypes.array,
  };

  render() {
    const { usersTyping } = this.props;
    return (
      <div className="typing-indicator-box">
        <ul>{
          usersTyping.map((userId) => {
            const name = 'Anonymous Robot #' + userId;
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

export default ChatUsersTyping;
