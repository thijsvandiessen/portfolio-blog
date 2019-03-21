
export default function lazyLoad() {

  // select all lazy images and put them in an array
  const lazyImages = [].slice.call(document.querySelectorAll("img[data-src]"));

  // Lazyload images with the help of IntersectionObserver
  if ("IntersectionObserver" in window) {

    const lazyImageObserver = new IntersectionObserver((images) => {
      images.forEach((image) => {
        if (image.isIntersecting) {
          const lazyImage = image.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.removeAttribute("data-src");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach((lazyImage) => {
      lazyImageObserver.observe(lazyImage);
    });

  } else {

    // a fall back to a more compatible method
    function oldSchoolLazyLoad() {

      lazyImages.forEach((lazyImage) => {

        // if img is loaded return
        if (lazyImage.src.substr(location.origin.length) === lazyImage.dataset.src) {return}

        // if the image is in the viewport, load the image
        if (lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) {
          lazyImage.src = lazyImage.dataset.src;
        }

      })
    };

    oldSchoolLazyLoad();

    document.addEventListener("scroll", oldSchoolLazyLoad);
    window.addEventListener("resize", oldSchoolLazyLoad);
    window.addEventListener("orientationchange", oldSchoolLazyLoad);

  };

};
