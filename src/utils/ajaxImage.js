import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'iris';
import defaultChatAvatar from '../images/individual.png';
import axios from '../../actions/axios';

class AjaxImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profilePictureData: defaultChatAvatar,
      loading: true,
    };
  }

  componentDidMount() {
    this.getImage(this.props.url);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.url !== nextProps.url) {
      this.getImage(nextProps.url);
    }
  }

  componentWillUnmount() {
    if (this.ongoingRequest) {
      this.ongoingRequest.cancel();
    }
  }

  getImage(url) {
    if (this.ongoingRequest) {
      this.ongoingRequest.cancel();
    }

    if (url) {
      this.ongoingRequest = this.props.fetchImage(url, (response) => {
        this.ongoingRequest = undefined;
        this.setImage(response.data);
      }, () => {
        this.ongoingRequest = undefined;
      });
    } else if (this.state.profilePictureData !== defaultChatAvatar) {
      this.setImage(defaultChatAvatar);
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    if (this.state.loading && this.props.showLoadingIndicator) {
      return <Loading />;
    }

    return (
            <img className={this.props.className} data-test-image="ajaxImage" src={this.state.profilePictureData} />
        );
  }

  setImage(image) {
    this.setState({
      profilePictureData: image,
      loading: false,
    });
  }
}

export function fetchImage(url, onSuccess, onError) {
  let cancelToken;
  if (url) {
    cancelToken = axios.CancelToken.source();
    axios.get(url, { cancelToken: cancelToken.token })
            .then((response) => {
              if (onSuccess) onSuccess(response);
            })
            .catch(function(thrown) {
              if (axios.isCancel(thrown)) {
                    // ignore
              }
              onError(thrown);
            }
        );
  }
  return cancelToken;
}

AjaxImage.defaultProps = {
  fetchImage: fetchImage,
};

AjaxImage.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string,
  fetchImage: PropTypes.func,
  showLoadingIndicator: PropTypes.bool,
};

export default AjaxImage;
