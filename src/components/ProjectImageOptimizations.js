import React, { Component } from 'react';
import GradientHeader from './GradientHeader';
import lazyLoad from '../utils/lazyLoad';

class ProjectImageOptimizations extends Component {

  constructor() {
    super()
  }

  componentDidMount() {

    // lazyload images
    lazyLoad()
  }

  render() {


    const heading = {
      title: 'Image optimizations to improve SEO',
    };

    const images = importAll(require.context('../images/portfolio/', false, /\.(jpe?g)$/));

    function importAll(r) {
      let images = {};
      r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
      return images;
    }

    return(
      <main>
        <article>
        <GradientHeader heading={heading} />
        <div className="content-container">


        <p>What are the SEO best practises you can perform on images? I implemented and documented here some image optimizations to improve my overall SEO performance. These optimizations are simple and also critical. For example: images do need text that describes what is in the image. There are a couple of ways that you can include text to an image. The most important one is an alt text. Furthermore, the web needs to be fast and images need to be small but do they need to be lazy loaded?</p>

        <p>I found out that it depends. Images above the fold don't need to be lazy loaded. It ruins the user experience when everything seem to be loading super slow. But images below the fold don't need to be loaded right away.</p>

        <p>That is why the images on this page below the fold are lazy loaded. If your browser support it then the images are also encoded in a next gen image format. I try to describe here and implement as much best practises and optimizations.</p>


        <h2>My lazy loading implementation</h2>
        <p>With the IntersectionObserver API you can simply observe when an image is visible in the viewport. I store the image url in a data-src attribute and put that value in the src when the image should be visible.</p>

        <p>The IntersectionObserver is unfortunately a very new API. And thus only supported by modern browsers. This does not mean that you should not use this API. Performance benefits are important too, and this API is a lot faster than my other implementation for older browsers.</p>


          <code><pre>{`
const lazyImageObserver = new IntersectionObserver((images) => {
  images.forEach((image) => {
    if (image.isIntersecting)
      image.target.src = image.target.dataset.src;
      lazyImageObserver.unobserve(image.target);
    };
  });
});

lazyImages.forEach((lazyImage) => {
  lazyImageObserver.observe(lazyImage);
});
          `}</pre>
          </code>

          <p>As I mentioned, this API is not supported by every browser. So I needed a fallback. With the getBoundingClientRect API you can discover when an element is in the viewport. But you have to use event listeners to scroll, resize and orientationchange. So the overall performance of the IntersectionObserver implementation is better.</p>

          <code><pre>{`
// a fall back to a more compatible method
function oldSchoolLazyLoad() {

  lazyImages.forEach((lazyImage) => {

    // if img is loaded return
    if (lazyImage.src.substr(location.origin.length)
    === lazyImage.dataset.src) {
      return
    };

    // if the image is in the viewport, load the image
    if (lazyImage.getBoundingClientRect().top <= window.innerHeight
    && lazyImage.getBoundingClientRect().bottom >= 0) {
      lazyImage.src = lazyImage.dataset.src;
    }

  })
};

oldSchoolLazyLoad();

document.addEventListener("scroll", oldSchoolLazyLoad);
window.addEventListener("resize", oldSchoolLazyLoad);
window.addEventListener("orientationchange", oldSchoolLazyLoad);
          `}</pre>
          </code>

          <h2>Support when Javascript is disabled</h2>
          <p>Lazy loading images is done with Javascript. When there is no Javascript, simply no images are loaded. So if if you want lazy loading and see images when Javascript is not enabled you have to do something extra. When Javascript is disabled you can add a noscript version of your image that you want to display.</p>

          <code><pre>{`
<noscript>
  <img alt="" src="image.jpg"/>
</noscript>
          `}</pre></code>

          <h2>My implementation of WebP</h2>
          <p>Only some of the newest browsers support WebP. So you need to progressively enhance your website for those browsers.</p>

          <p>To omit the hassle of changing every hard coded image you can use a rewrite rule. Via a rewrite rule in your htaccess file for example. You can automatically serve a WebP version of your image if the browser supports it.</p>

          <h2>Further optimizations:</h2>
          <p>I like to optimize the size for specific screens with srcset to make the images also responsive.</p>

          <h2>An example gallery of lazy loading images</h2>

          <p>Six images with each a tiny blurred version and a big version that loads very slow. Each image has also a WebP counterpart. Thus there are in total 24 images.</p>

          <div className="gallery">
            <img
              src={images["IMG_1790-tiny.jpg"]}
              data-src={images["IMG_1790.jpeg"]}
              alt="Rydal Cave, a stone quarry in the Lake District"
              title="Rydal Cave, Lake District"
            />
            <img
              src={images["IMG_2543-tiny.jpg"]}
              data-src={images["IMG_2543.jpeg"]}
              alt="Buttermere and Crummock Water from the mountains"
              title="Buttermere and Crummock Water, Lake District"
            />
            <img
              src={images["IMG_4442-tiny.jpg"]}
              data-src={images["IMG_4442.jpeg"]}
              alt="The lower Antelope Canyon in Arizona"
              title="Antelope Canyon in the Navajo Nation. This sandstone slot canyon is renowned for its undulating angles & light shafts."
            />
            <img src={images["IMG_4468-tiny.jpg"]}
              data-src={images["IMG_4468.jpg"]}
              alt="Detail of the Patriarchs at sunrise. An impressive sandstone cliff at Zion National Park."
              title="Sunrise at Zion, a detail from the Patriarchs."
            />
            <img
              src={images["IMG_5358-tiny.jpg"]}
              data-src={images["IMG_5358.jpeg"]}
              alt="A close up from a young Mule Deer at Bryce National Park"
              title="A Mule Deer at Bryce National Park"
            />
            <img
              src={images["IMG_5921-tiny.jpg"]}
              data-src={images["IMG_5921.jpeg"]}
              alt="Standing on a rock in the Grand Canyon at sunrise."
              title="Casually looking into the Grand Canyon"
            />
          </div>
          </div>
        </article>
      </main>
    );

  };
};

export default ProjectImageOptimizations;
