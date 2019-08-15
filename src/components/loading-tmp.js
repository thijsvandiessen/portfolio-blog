import React, {Component} from 'react';
import '../styles/loading-tmp.scss';

class Loading extends Component {
  render() {
    return (
      <svg className="spinner" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle className="path" cx={50} cy={50} r={25} fill="none" strokeWidth={5} />
      </svg>
    );
  }
}

export default Loading;
