
export default function lazyLoad() {

  // select all lazy images and put them in an array
  const images = [].slice.call(document.querySelectorAll("img[data-src]"));

  // Lazyload images with the help of the IntersectionObserver API
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

  } else {

    // a fall back to a more compatible slow method
    function oldSchoolLazyLoad() {

      images.forEach(image => {

        // if img is loaded return
        if (image.src.substr(location.origin.length) === image.dataset.src) return;

        // if the image is in the viewport, load the image
        if (image.getBoundingClientRect().top <= window.innerHeight && image.getBoundingClientRect().bottom >= 0) {
          image.src = image.dataset.src;
        };

      })
    };

    oldSchoolLazyLoad();

    document.addEventListener("scroll", oldSchoolLazyLoad);
    window.addEventListener("resize", oldSchoolLazyLoad);
    window.addEventListener("orientationchange", oldSchoolLazyLoad);

  };

};
