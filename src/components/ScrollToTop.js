import React, {Component} from 'react';
import {withRouter} from 'react-router';

/**
 * A class that can execute scroll to top
 */
class ScrollToTop extends Component {
  /**
  * scroll to top.
  * @param {object} prevProps
  * @return {void}
  */
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  /**
  * render children
  * @return {object}
  */
  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
