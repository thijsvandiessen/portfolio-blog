import React, { Component } from 'react';
import GradientHeader from './GradientHeader';
import lazyLoad from '../utils/lazyLoad';
import { Link } from 'react-router-dom'

class ProjectImageOptimizations extends Component {

  constructor() {
    super()

    this.state = {
      images: null,
    }
  }

  componentDidMount() {

    // load the right images
    this.check_webp();
  }

  componentDidUpdate() {

    // lazyload images
    lazyLoad();
  }

  // check_webp lossy image
  // 'import(result)' will be passed back the detection result
  check_webp() {
    const testImage = "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA";
    const img = new Image();
    img.src = "data:image/webp;base64," + testImage;
    img.onload = () => {
      const result = (img.width > 0) && (img.height > 0);
      this.import(result);
    };
    img.onerror = () => this.import(false);
  }

  import(result){

    let images;

    // if the browser supports webp
    if (result) {
      images = this.importAll(require.context('../images/portfolio/', false, /\.(webp)$/));
    }

    else {
      images = this.importAll(require.context('../images/portfolio/', false, /\.(jpg)$/));
    }

    this.setState({
      images: images
    });

  }

  importAll(files){

    const images = {};
    files.keys()
      .map((item, index) => images[item.replace('./', '')] = files(item));
    return images;
  }

  render() {

    const heading = {
      title: 'Image optimizations to improve SEO',
      subTitle: "I implemented and documented some best practises",
    };

    const images = this.state.images;

    return(
      <main>
        <article>
        <GradientHeader heading={heading} />
        <div className="content-container">

        <p>What are the SEO best practises you can perform on images? I implemented and documented here some image optimizations to improve my overall SEO performance. I got a bit lost in my technical implementation but did not forget the bigger picture. If you want to be found, you should be found because of your high quality and original content.</p>

        <p>But optimizations help. If you naturally describe what is in your image, without any keyword stuffing, then people can search for your image. There are a couple of ways that you can include text to an image. The most important one is alt text. But a title and caption can also help the user experience.</p>

        <p>A fancy optimization I implemented on this site is lazy loading. The web needs to be fast and images need to be small but do they really need to be lazy loaded?</p>

        <p>I found out that it depends. Images above the fold don't need to be lazy loaded. It ruins the user experience when everything seem to be loading super slow. But images below the fold don't need to be loaded right away.</p>

        <p>That is why the images on this page below the fold are lazy loaded. If your browser support it, then the images are also encoded in a next gen image format. I try to describe here and implement as much best practises and optimizations.</p>

        <h2>My lazy loading implementation</h2>

        <p>The IntersectionObserver API can simply observe when an image is visible in the viewport. I store the image url in a data-src attribute and put that value in the src when the image should be visible.</p>

        <p>The IntersectionObserver is unfortunately a new API. And thus only supported by modern browsers. This does not mean that you should not use this API. Performance benefits are important, and this API is a lot faster than my other implementation for older browsers.</p>

        <figure>
          <code>
            <pre>{`
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver(images => {
    images.filter(image => image.isIntersecting === true)
      .map(image => {
        const target = image.target;
        target.src = target.dataset.src;
        target.removeAttribute("data-src");
        imageObserver.unobserve(target);
      }
    );
  });
  images.map(image => imageObserver.observe(image));
}
            `}</pre>
            </code>
            <figcaption>
              My lazy loading implementation for modern browsers.
            </figcaption>
          </figure>

          <p>As I mentioned, this IntersectionObserver API is not supported by every browser. So I needed a fallback. With the getBoundingClientRect API you can discover when an element is in the viewport too. But you have to use event listeners to scroll, resize and orientationchange. So the performance of the IntersectionObserver implementation is better.</p>

          <figure><code><pre>{`
function oldSchoolLazyLoad() {
  images.forEach((image) => {

    // if img is loaded return
    if (image.src.substr(location.origin.length)
    === image.dataset.src) return;

    // if the image is in the viewport, load the image
    if (image.getBoundingClientRect().top <= window.innerHeight
    && image.getBoundingClientRect().bottom >= 0) {
      image.src = image.dataset.src;
    }

  })
};

oldSchoolLazyLoad();

document.addEventListener("scroll", oldSchoolLazyLoad);
window.addEventListener("resize", oldSchoolLazyLoad);
window.addEventListener("orientationchange", oldSchoolLazyLoad);
          `}</pre>
          </code>
          <figcaption>My lazy loading implementation for older browsers.</figcaption>
          </figure>

          <h2>Support when Javascript is disabled</h2>
          <p>Lazy loading images is done with Javascript. When there is no Javascript, simply no images are loaded. So if if you want lazy loading and see images when Javascript is not enabled you have to do something extra. When Javascript is disabled you can add a noscript version of your image that you want to display.</p>

          <figure>
            <code>
              <pre>{`
<noscript>
  <img alt="" src="image.jpg"/>
</noscript>
          `}</pre>
            </code>
            <figcaption>
              A solution to load images when Javascript is disabled
            </figcaption>
          </figure>

          <h2>My implementation of WebP</h2>

          <p>Only some of the newest browsers support WebP. So you need to progressively enhance your website for those browsers.</p>

          <p>To omit the hassle of changing every hard coded image I first used a rewrite rule in my htaccess configuration file. You can automatically serve a WebP version of your image if the browser supports it. I followed basicly the instructions of <a href="https://www.digitalocean.com/community/tutorials/how-to-create-and-serve-webp-images-to-speed-up-your-website" titel="How to create and serve webp images">this article</a>.</p>

          <p>But I had a small problem. Google saw this as a redirection error in its mobile friendly test. To fix this issue I implemented a client side check. Because images are loaded in a asynchronous way </p>

          <figure>
            <code>
              <pre>{`
check() {
  // a lossy webp image
  const testImage = "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA";
  const img = new Image();
  img.src = "data:image/webp;base64," + testImage;
  img.onload = () => {
    const result = (img.width > 0) && (img.height > 0);
    callback(result);
  };
  img.onerror = () => callback(false);
}
                `}</pre>
            </code>
            <figcaption>
              A check to discover support for lossy webp images.
            </figcaption>
          </figure>

          <h2>Further optimizations:</h2>

          <ul>
            <li>I like to optimize the size for specific screens with the help of srcset to make the images also responsive.</li>
            <li>A nice smooth blurry placeholder image.</li>
          </ul>

          <h2>An example gallery of lazy loading images</h2>

          <p>Six images with each a tiny blurred version and a bigger version that loads a lot slower. Each image has also a WebP counterpart. Thus there are in total 24 images here.</p>

          {images &&
          <div className="gallery">
            <a href="../assets/IMG_1790.jpg"
              title="Open this image of Rydal Cave, Lake District">
              <img
                src={images[Object.keys(images)[0]]}
                data-src={images[Object.keys(images)[1]]}
                alt="Rydal Cave, a stone quarry in the Lake District"
                title="Rydal Cave, Lake District"
              />
            </a>
            <a href="../assets/IMG_2543.jpg" title="Open this image of Buttermere and Crummock Water, Lake District">
              <img
                src={images[Object.keys(images)[2]]}
                data-src={images[Object.keys(images)[3]]}
                alt="Buttermere and Crummock Water from the mountains"
                title="Buttermere and Crummock Water, Lake District"
              />
            </a>
            <a href="../assets/IMG_4442.jpg" title="Open this image of the Antelope Canyon">
            <img
              src={images[Object.keys(images)[4]]}
              data-src={images[Object.keys(images)[5]]}
              alt="The lower Antelope Canyon in Arizona"
              title="Antelope Canyon in the Navajo Nation. This sandstone slot canyon is renowned for its undulating angles & light shafts."
            />
            </a>
            <a href="../assets/IMG_4468.jpg" title="Open image Sunrise at Zion, a detail from the Patriarchs.">
            <img src={images[Object.keys(images)[6]]}
              data-src={images[Object.keys(images)[7]]}
              alt="Detail of the Patriarchs at sunrise. An impressive sandstone cliff at Zion National Park."
              title="Sunrise at Zion, a detail from the Patriarchs."
            />
            </a>
            <a href="../assets/IMG_5358.jpg" title="Open this image of a Mule Deer at Bryce National Park">
            <img
              src={images[Object.keys(images)[8]]}
              data-src={images[Object.keys(images)[9]]}
              alt="A close up from a young Mule Deer at Bryce National Park"
              title="A Mule Deer at Bryce National Park"
            />
            </a>
            <a href="../assets/IMG_5921.jpg" title="Open this image of me, casually looking into the Grand Canyon">
            <img
              src={images[Object.keys(images)[10]]}
              data-src={images[Object.keys(images)[11]]}
              alt="Standing on a rock in the Grand Canyon at sunrise."
              title="Casually looking into the Grand Canyon"
            />
            </a>
          </div>
        }
          </div>
        </article>
      </main>
    );

  };
};

export default ProjectImageOptimizations;
