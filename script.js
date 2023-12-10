// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

//carousel


function autoplayCarousel() {
    const carouselEl = document.getElementById("carousel");
    const slideContainerEl = carouselEl.querySelector("#slide-container");
    const slideEl = carouselEl.querySelector(".slide");
    let slideWidth = slideEl.offsetWidth;
    // Add click handlers
    document.querySelector("#back-button")
        .addEventListener("click", () => navigate("backward"));
    document.querySelector("#forward-button")
        .addEventListener("click", () => navigate("forward"));
    document.querySelectorAll(".slide-indicator")
        .forEach((dot, index) => {
            dot.addEventListener("click", () => navigate(index));
            dot.addEventListener("mouseenter", () => clearInterval(autoplay));
        });
    // Add keyboard handlers
    document.addEventListener('keydown', (e) => {
        if (e.code === 'ArrowLeft') {
            clearInterval(autoplay);
            navigate("backward");
        } else if (e.code === 'ArrowRight') {
            clearInterval(autoplay);
            navigate("forward");
        }
    });
    // Add resize handler
    window.addEventListener('resize', () => {
        slideWidth = slideEl.offsetWidth;
    });
    // Autoplay
    const autoplay = setInterval(() => navigate("forward"), 4000);
    slideContainerEl.addEventListener("mouseenter", () => clearInterval(autoplay));
    // Slide transition
    const getNewScrollPosition = (arg) => {
        const gap = 10;
        const maxScrollLeft = slideContainerEl.scrollWidth - slideWidth;
        if (arg === "forward") {
            const x = slideContainerEl.scrollLeft + slideWidth + gap;
            return x <= maxScrollLeft ? x : 0;
        } else if (arg === "backward") {
            const x = slideContainerEl.scrollLeft - slideWidth - gap;
            return x >= 0 ? x : maxScrollLeft;
        } else if (typeof arg === "number") {
            const x = arg * (slideWidth + gap);
            return x;
        }
    }
    const navigate = (arg) => {
        slideContainerEl.scrollLeft = getNewScrollPosition(arg);
    }
    // Slide indicators
    const slideObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const slideIndex = entry.target.dataset.slideindex;
                carouselEl.querySelector('.slide-indicator.active').classList.remove('active');
                carouselEl.querySelectorAll('.slide-indicator')[slideIndex].classList.add('active');
            }
        });
    }, { root: slideContainerEl, threshold: .1 });
    document.querySelectorAll('.slide').forEach((slide) => {
        slideObserver.observe(slide);
    });
}
autoplayCarousel();
        

//scroll visdaris

document.addEventListener("DOMContentLoaded", function () {
    var overflowElement = document.querySelector(".overflow");
    var midElement = document.querySelector(".mid");
    var footElement = document.querySelector(".foot");
  
    window.addEventListener("scroll", function () {
      var scrollPosition = window.scrollY || window.pageYOffset;
  
      // Calculate the offsets
      var stopOffsetMid = midElement.offsetTop;
      var stopOffsetFoot = footElement.offsetTop;
  
      // Check if the scroll position is below the stopOffsetMid but above the stopOffsetFoot
      if (scrollPosition < stopOffsetMid && scrollPosition < stopOffsetFoot) {
        // If yes, make the .overflow element sticky
        overflowElement.style.position = "sticky";
        overflowElement.style.top = "0";
      } else {
        // If not, remove the sticky positioning
        overflowElement.style.position = "static";
        overflowElement.style.top = "auto";
      }
    });
  });
  
  