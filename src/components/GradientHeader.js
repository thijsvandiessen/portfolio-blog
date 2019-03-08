import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GradientHeader extends Component {

  componentDidMount() {
    // Set the html page title
    document.title = this.props.heading.title;
  }

  button(){
    return <a href="test">test</a>
  }

  render() {

    const heading = this.props.heading;

    return (
      <header className={`gradientHeader ${heading.huge ? 'huge':''}`}>
        <h1>{heading.title}</h1>

        {heading.subTitle && <p>{heading.subTitle}</p>}

        {heading.button &&
          <a className="button"
            href={heading.button.link}
            onClick={heading.button.toggle}
          >
            {heading.button.text}
          </a>
        }

      </header>
    )
  }
}

export default GradientHeader;
