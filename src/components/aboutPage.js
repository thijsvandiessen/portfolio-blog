import React, {Component} from 'react';
import GradientHeader from './gradientHeader';
import lazyLoad from '../utils/lazyLoad';
import {Link} from 'react-router-dom';
import tinyImage5921 from '../images/portfolio/IMG_5921-tiny.jpg';
import image5921 from '../images/portfolio/IMG_5921.jpg';

class AboutPage extends Component {
  componentDidMount() {
    // lazyload images
    lazyLoad();
  }

  render() {
    const heading = {
      title: 'About me',
    };
    return (
      <main>
        <article>
          <GradientHeader heading={heading} />

          <div className="content-container">
            <h2>Hi, my name is Thijs</h2>
            <p>
              My skill set contains out of designing and developing user
              experiences by the means of a creative process of creating and
              testing lots of ideas and concepts. Analysing my results enables me
              to focus on concepts that work.
            </p>
            <p>
              People around me tell me that I’m marked by my creativity. I’m
              strong in brainstorming because of my associative thinking. With my
              experience in Adobe Software I visualise ideas fast.
            </p>
            <p>Also I know how to:</p>
            <ul>
              <li>Setup my no sudo node environment</li>
              <li>Create fancy automated Google Data Studio dashboards</li>
              <li>Design prototypes and Photoshop experiences</li>
              <li>Craft icons in Adobe Illustrator</li>
              <li>Create interactive presenations or books in Adobe Indesign</li>
              <li>
                Create websites and webpages with HTML, PHP, JavaScript, React and CSS
              </li>
              <li>Develop responsive and bulletproof HTML email templates</li>
            </ul>
            <h2>The future</h2>
            <p>
              I have a lot of ambition and want to design and develop awesome and
              better user experiences. With my creativity I like to help people,
              which is why I wanted to become a more creative developer and designer in the first place. In the meanwhile I want to continue exploring and learning in order to come to new creative insights. Every day I'm doing nothing less than my very best.
            </p>

            <h2>My hobbies</h2>
            <p>
              I really love classical music. Since I was young I played the
              violin, but now I play the Double Bass. A much bigger and practical
              instrument. I play in a lot of orchestras every week where I also do some publicity related work.
            </p>
            <p>I further like to travel, hike and take cool pictures.</p>

            <p>If you like to know more about me, <Link to="/contact" title="send me an email">get in touch</Link>.</p>
            <div className="gallery">
              <img
                src={tinyImage5921}
                data-src={image5921}
                alt="Standing on a rock in the Grand Canyon at sunrise."
                title="Casually looking into the Grand Canyon"
              />
            </div>
          </div>
        </article>
      </main>
    );
  }
}

export default AboutPage;
