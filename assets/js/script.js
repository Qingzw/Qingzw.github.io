const downArrow = document.querySelector('.down-arrow');
const mainContent = document.querySelector('.top-nav');
let isScrolling = false;

downArrow.addEventListener('click', function () {
  if (!isScrolling) {
    isScrolling = true;
    const viewportHeight = window.innerHeight;
    const targetOffsetTop = mainContent.getBoundingClientRect().top + window.pageYOffset;
    const totalDistance = targetOffsetTop;
    const duration = 1000;
    const startTime = performance.now();

    function scrollAnimation(currentTime) {
      if (!isScrolling) {
        return;
      }
      const timeElapsed = currentTime - startTime;
      const scrollProgress = Math.min(timeElapsed / duration, 1);
      const easeInOutQuad = function (t) {
        return t < 0.5? 2 * t * t : -1 + (4 - 2 * t) * t;
      };
      const easedProgress = easeInOutQuad(scrollProgress);
      window.scrollTo(0, totalDistance * easedProgress);
      if (scrollProgress < 1) {
        requestAnimationFrame(scrollAnimation);
      } else {
        isScrolling = false;
      }
    }

    requestAnimationFrame(scrollAnimation);
  }
});