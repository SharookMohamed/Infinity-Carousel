const wrapperLoop = document.querySelector(".wrapperLoop");
const containerLoop = document.querySelector(".containerLoop");
const childrenLoop = wrapperLoop.querySelectorAll(".prdct--crsl-div");
const leftArrLoop = document.querySelector(".left-arrow");
const rightArrLoop = document.querySelector(".right-arrow");

let currentIndexLoop = 0;

// Function to update active class and center clicked element
function updateActiveAndCenter(clickedIndexLoop) {
  childrenLoop.forEach((child, index) => {
    if (index === clickedIndexLoop) {
      child.classList.add("active");
      // Center the clicked element in the containerLoop
      const containerLoopWidth = containerLoop.offsetWidth;
      const childWidth = child.offsetWidth;
      const scrollLeft =
        child.offsetLeft - (containerLoopWidth - childWidth) / 2;
      containerLoop.scrollLeft = scrollLeft;

      // Autoplay the video in the active element
      const video = child.querySelector("video");
      if (video) {
        video.play();
      }
    } else {
      child.classList.remove("active");
      // Pause video in inactive elements
      const video = child.querySelector("video");
      if (video) {
        video.pause();
      }
    }
  });
}

// Add click event listeners to each prdct--crsl-div
childrenLoop.forEach((child, index) => {
  child.addEventListener("click", () => {
    updateActiveAndCenter(index);
  });
});

// Initial call to updateActiveClass on page load
updateActiveClass();

containerLoop.addEventListener("click", function (e) {
  if (e.target.classList.contains("right-arrow")) {
    wrapperLoop.style.transition = ".5s ease all";
    wrapperLoop.appendChild(wrapperLoop.firstElementChild);
    updateActiveClass();

    // Pause all videos except the current active one
    pauseAllVideosExceptActive(currentIndexLoop);
  }

  if (e.target.classList.contains("left-arrow")) {
    wrapperLoop.style.transition = ".5s ease all";
    wrapperLoop.prepend(wrapperLoop.lastElementChild);
    updateActiveClass();

    // Pause all videos except the current active one
    pauseAllVideosExceptActive(currentIndexLoop);
  }
});

// Function to pause all videos except the active one
function pauseAllVideosExceptActive(activeIndex) {
  childrenLoop.forEach((child, index) => {
    const video = child.querySelector("video");
    if (index !== activeIndex) {
      video.pause();
    }
  });
}

// Function to update active class based on element's position
function updateActiveClass() {
  const containerLoopRect = containerLoop.getBoundingClientRect();
  const containerLoopCenter =
    containerLoopRect.left + containerLoopRect.width / 2;

  let closestElement = null;
  let closestDistance = Infinity;

  childrenLoop.forEach((child, index) => {
    const childRect = child.getBoundingClientRect();
    const childCenter = childRect.left + childRect.width / 2;
    const distance = Math.abs(containerLoopCenter - childCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestElement = child;
      currentIndexLoop = index;
    }
  });

  childrenLoop.forEach((child) => child.classList.remove("active"));
  if (closestElement) {
    closestElement.classList.add("active");

    // Remove existing arrows from other elements
    document
      .querySelectorAll(".right-arrow, .left-arrow")
      .forEach((el) => el.remove());

    // Create and append left and right arrows to the active element
    const ArrowLeftLoop = document.createElement("div");
    ArrowLeftLoop.classList.add("right-arrow");
    ArrowLeftLoop.innerHTML =
      '<img src="https://cdn.shopify.com/s/files/1/0626/5015/5053/t/3/assets/ryt-arrow-loop.svg?v=1721368804" alt="" class="right-arrow">';
    closestElement.appendChild(ArrowLeftLoop);

    const ArrowrightLoop = document.createElement("div");
    ArrowrightLoop.classList.add("left-arrow");
    ArrowrightLoop.innerHTML =
      '<img src="https://cdn.shopify.com/s/files/1/0626/5015/5053/t/3/assets/lft-arrow-loop.svg?v=1721368788"  alt="" class="left-arrow">';
    closestElement.appendChild(ArrowrightLoop);

    // Scroll to center the active element in the containerLoop
    const scrollOffset =
      closestElement.offsetLeft +
      closestElement.offsetWidth / 2 -
      containerLoop.offsetWidth / 2;
    wrapperLoop.scrollLeft = scrollOffset;

    // Autoplay the video in the active element
    const video = closestElement.querySelector("video");
    if (video) {
      video.play();
    }
  }
}

// Event listeners for window resize and page load
window.addEventListener("resize", updateActiveClass);
window.addEventListener("load", updateActiveClass);