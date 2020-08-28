import React, { Component, setState } from "react";
import GradientHeader from "./gradientHeader";
import lazyLoad from "../utils/lazyLoadImages";

/**
 * A class that returns my lazy load project description
 */
class ProjectImageOptimizations extends Component {
  /**
   * It initializes the state
   */
  constructor() {
    super();

    this.state = {
      images: null,
    };

    this.import = this.import.bind(this);
  }

  /**
   * load the right images
   */
  componentDidMount() {
    this.checkWebp(this.import);
  }

  /**
   * It lazyloads the images
   */
  componentDidUpdate() {
    lazyLoad();
  }

  /**
   * checkWebp lossy image
   * @return {void}
   */
  checkWebp(callback) {
    const testImage =
      "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA";
    const img = new Image();

    img.onload = () => {
      const result = img.width > 0 && img.height > 0;
      callback(result);
    };

    img.onerror = () => {
      callback(false);
    };

    img.src = "data:image/webp;base64," + testImage;
  }

  /**
   * Callback function - Imports the right images
   * @param {boolean} result - webp or jpg
   * @return {void} sets the state
   */
  import(result) {
    const images = {};

    function importAll(r) {
      r.keys().forEach((key, index) => (images[index] = r(key)));
    }

    // if the browser supports webp
    if (result === true) {
      importAll(
        require.context("../images/portfolio/", false, /\.(webp)$/, "sync")
      );
    }

    // no webp support
    if (result === false) {
      importAll(
        require.context("../images/portfolio/", false, /\.(jpg)$/, "sync")
      );
    }

    this.setState(() => ({
      images,
    }));
  }

  /**
   * The article
   * @return {object} the article
   */
  render() {
    const heading = {
      title: "Lazy loading images to make your site fast",
      subTitle:
        "I implemented and documented some best practises to create a fast web experience!",
    };

    const images = this.state.images;

    return (
      <main>
        <article>
          <GradientHeader heading={heading} />
          <div className="content-container">
            <p>
              I’m a bit obsessed about speed, performance and accessibility.
              Creating great and fast experiences is something I really like.
              Hence this article, how to implement lazy loading with great
              support? And can we do something extra?
            </p>

            <h2>Native browser lazy-loading</h2>

            <p>
              The best solution I think, no bytes are sent if there is no image
              to show to the user.
            </p>

            <p>
              Unfortunately only{" "}
              <a href="https://caniuse.com/#feat=loading-lazy-attr">
                some browsers
              </a>{" "}
              support this native browser lazy-loading attribute. This attribute
              can simply be added to <code>{`<img>`}</code> elements. Then an
              image will be loaded when it is needed.
            </p>

            <p>
              To prevent a layout shift you need to specify dimensions of your
              lazy image. This gives visual stability. A cumulative layout shift
              is also a core web vital metric.
            </p>

            <p>Example:</p>

            <figure>
              <code>
                <pre>{`
<img src="/image.jpg" alt="..." loading="lazy" width="100" height="100" >
            `}</pre>
              </code>
              <figcaption>The loading attribute in use</figcaption>
            </figure>

            <h2>Lazy loading with the IntersectionObserver API</h2>

            <p>
              The intersection observer API can simply observe when an element
              or image is visible in the viewport. I store the image url in a
              data-src attribute and put that value in the src attribute when
              the image should be visible.
            </p>

            <p>
              This API is unfortunately{" "}
              <a href="https://caniuse.com/#feat=intersectionobserver">
                only supported by modern browsers.
              </a>{" "}
              This does not mean that you should not use this API. Performance
              benefits are important, and this API is a lot faster than my other
              implementation for older browsers.
            </p>

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

            <h2>IntersectionObserver fallback for older browsers</h2>
            <p>
              As I mentioned, this IntersectionObserver API is not supported by
              every browser. So I needed a intersection observer fallback. With
              the <strong>getBoundingClientRect API</strong> you can discover
              when an element is in the viewport too. But you have to use event
              listeners to scroll, resize and orientationchange. So the
              performance of the IntersectionObserver implementation is a lot
              better.
            </p>

            <figure>
              <code>
                <pre>{`
function oldSchoolLazyLoad() {
  images.forEach((image) => {

    // if img is loaded return
    if (image.src.substr(location.origin.length) === image.dataset.src) return;

    // if the image is in the viewport, load the image
    if (image.getBoundingClientRect().top <= window.innerHeight && image.getBoundingClientRect().bottom >= 0) {
      image.src = image.dataset.src;
    }
  })
};

document.addEventListener("scroll", oldSchoolLazyLoad);
window.addEventListener("resize", oldSchoolLazyLoad);
window.addEventListener("orientationchange", oldSchoolLazyLoad);

oldSchoolLazyLoad();
          `}</pre>
              </code>
              <figcaption>
                My lazy loading implementation for older browsers.
              </figcaption>
            </figure>

            <h2>Lazy CSS background images</h2>

            <p>
              CSS resources are downloaded when the DOM and CSSOM trees are
              combined.
            </p>

            <p>
              So you can change the render tree when you need another CSS
              backbground image. You can even use this method to serve WebP images.
            </p>

            <figure>
              <code>
                <pre>{`
// CSS
.lazy-background-image {
  background-image: url("/placehoder-header.jpg"); /* A placeholder image */
}

.lazy-background-image.visible {
  background-image: url("/header.jpg"); /* The original image */
}

.lazy-background-image.visible.webp-support {
  background-image: url("/header.webp"); /* If also the class webp-support is added */
}

// HTML
<div class="lazy-background-image visible">
          `}</pre>
              </code>
              <figcaption>
                An HTML element with a CSS placeholder background image
              </figcaption>
            </figure>

            <p>You only need to alter a class with Javascript.</p>

            <h2>Support when Javascript is disabled</h2>
            <p>
              When Javascript is disabled and you lazy load images with
              Javascript, simply no images are loaded. So if you lazy load with
              Javascript you have to do something extra. You can simply add a
              noscript version of your image to your HTML that you want to
              display.
            </p>
            <figure>
              <code>
                <pre>{`
<noscript>
  <img alt="" src="/image.jpg"/>
</noscript>
          `}</pre>
              </code>
              <figcaption>
                A solution to load images when Javascript is disabled
              </figcaption>
            </figure>

            <h2>My implementation of WebP, sending less bytes over the wire</h2>

            <p>
              To optimize your site even further, you can serve smaller images
              with the same resolution in this next gen webp format.
            </p>

            <p>
              Only modern browsers support WebP. So you need to progressively
              enhance your website for those browsers.
            </p>

            <p>
              To omit the hassle of changing every hard coded image I first used
              a rewrite rule in my htaccess configuration file. If the Accept
              header contains image/webp you can serve a WebP version.
            </p>

            <figure>
              <code>
                <pre>{`
<IfModule mod_rewrite.c>
  RewriteEngine On

  # Check if browser supports WebP images
  RewriteCond %{HTTP_ACCEPT} image/webp

  # Check if WebP replacement image exists
  RewriteCond %{DOCUMENT_ROOT}/$1.webp -f

  # Serve WebP image instead
  RewriteRule (.+)\.(jpe?g|png)$ $1.webp [T=image/webp,E=REQUEST_image]
</IfModule>

<IfModule mod_headers.c>
  # Vary: Accept for all the requests to jpeg and png
  Header append Vary Accept env=REQUEST_image
</IfModule>

<IfModule mod_mime.c>
  AddType image/webp .webp
</IfModule>
                `}</pre>
              </code>
              <figcaption>A hack to serve WebP images.</figcaption>
            </figure>

            <p>
              I later implemented a client side check with a small lossy webp
              image.
            </p>

            <figure>
              <code>
                <pre>{`
webpSupportCheck(callback) {
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
                A check to discover support for lossy WebP images.
              </figcaption>
            </figure>

            <p>
              A better way is to use a <code>{`<picture>`}</code> element. You
              can simply serve all the options and the browser can choose.
            </p>

            <figure>
              <code>
                <pre>{`
<picture>
  <source srcset="/image.webp" type="image/webp">
  <img src="/image.jpg" alt="">
</picture>
                `}</pre>
              </code>
              <figcaption>A nice way to serve WebP images</figcaption>
            </figure>

            <h2>Further optimizations:</h2>

            <ul>
              <li>
                I like to optimize the size for specific screens with the help
                of <code>srcset</code> to make the images also responsive. But I
                don't like to create so many images.
              </li>
              <li>
                To be sure that your images are indexed by search engines you
                can expose a separate{" "}
                <a href="https://support.google.com/webmasters/answer/178636">
                  image sitemap
                </a>
                . In an image sitemap you can also include extra information
                like geo location data.
              </li>
            </ul>

            <h2>An example gallery of my WebP optimized lazy loading images</h2>

            <p>
              Six images with each a tiny blurred version and a bigger version
              that loads a lot slower. Each image has also a WebP counterpart.
              Thus there are in total 24 images here.
            </p>

            {images && (
              <div className="gallery">
                <a
                  href="/IMG_1790.jpg"
                  title="Open this image of Rydal Cave, Lake District"
                >
                  <img
                    loading="lazy"
                    width="800"
                    height="1207"
                    src={images[Object.keys(images)[0]].default}
                    data-src={images[Object.keys(images)[1]].default}
                    alt="Rydal Cave, a stone quarry in the Lake District"
                    title="Rydal Cave, Lake District"
                  />
                </a>
                <a
                  href="/IMG_2543.jpg"
                  title="Open this image of Buttermere and Crummock Water, Lake District"
                >
                  <img
                    loading="lazy"
                    width="800"
                    height="358"
                    src={images[Object.keys(images)[2]].default}
                    data-src={images[Object.keys(images)[3]].default}
                    alt="Buttermere and Crummock Water from the mountains"
                    title="Buttermere and Crummock Water, Lake District"
                  />
                </a>
                <a
                  href="/IMG_4442.jpg"
                  title="Open this image of the Antelope Canyon"
                >
                  <img
                    loading="lazy"
                    width="800"
                    height="455"
                    src={images[Object.keys(images)[4]].default}
                    data-src={images[Object.keys(images)[5]].default}
                    alt="The lower Antelope Canyon in Arizona"
                    title="Antelope Canyon in the Navajo Nation. This sandstone slot canyon is renowned for its undulating angles & light shafts."
                  />
                </a>
                <a
                  href="/IMG_4468.jpg"
                  title="Open image Sunrise at Zion, a detail from the Patriarchs."
                >
                  <img
                    loading="lazy"
                    width="800"
                    height="800"
                    src={images[Object.keys(images)[6]].default}
                    data-src={images[Object.keys(images)[7]].default}
                    alt="Detail of the Patriarchs at sunrise. An impressive sandstone cliff at Zion National Park."
                    title="Sunrise at Zion, a detail from the Patriarchs."
                  />
                </a>
                <a
                  href="/IMG_5358.jpg"
                  title="Open this image of a Mule Deer at Bryce National Park"
                >
                  <img
                    loading="lazy"
                    width="800"
                    height="533"
                    src={images[Object.keys(images)[8]].default}
                    data-src={images[Object.keys(images)[9]].default}
                    alt="A close up from a young Mule Deer at Bryce National Park"
                    title="A Mule Deer at Bryce National Park"
                  />
                </a>
                <a
                  href="/IMG_5921.jpg"
                  title="Open this image of me, casually looking into the Grand Canyon"
                >
                  <img
                    loading="lazy"
                    width="800"
                    height="490"
                    src={images[Object.keys(images)[10]].default}
                    data-src={images[Object.keys(images)[11]].default}
                    alt="Standing on a rock in the Grand Canyon at sunrise."
                    title="Casually looking into the Grand Canyon"
                  />
                </a>
              </div>
            )}
          </div>
        </article>
      </main>
    );
  }
}

export default ProjectImageOptimizations;
