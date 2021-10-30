// Get elements
const CURRENT_SLIDE_NUM = document.querySelector(".current-slide-num");
const LAST_SLIDE_NUM = document.querySelector(".last-slide-num");

// Some variables
let slideIndex = [1, 1];
let slideId = ["slider1", "slider2"];

//? This function incriments or decriment the "slideIndex"
//? depending on the button | [prev, next] user has clicked
function setSlideIndex(n, no) {
    showSlide((slideIndex[no] += n), no);
}

//? This function sets the current index of the slide
//? depending on what dot you clicked...
function setCurrentIndex(e, no) {
    showSlide((slideIndex[no] = Number(e.target.dataset.slideIndex)), no);
}

//? This function appends the dot depending on the
//? amount of slides there is...
function appendDots(no) {
    const SLIDES = document.querySelectorAll(`#${slideId[no]} .slide`);
    const SLIDER_DOTS = document.querySelector(`#${slideId[no]} .slider-dots`);

    for (let i = 0; i < SLIDES.length; i++) {
        const DOT = document.createElement("div");
        DOT.className = "dot";
        DOT.setAttribute("data-slide-index", i + 1);
        DOT.addEventListener("click", (e) => setCurrentIndex(e, no));
        SLIDER_DOTS.appendChild(DOT);
    }
}

appendDots(0);
appendDots(1);

//? This function shows the current slide
function showSlide(n, no) {
    const SLIDES = document.querySelectorAll(`#${slideId[no]} .slide`);
    const DOTS = document.querySelectorAll(`#${slideId[no]} .slider-dots .dot`);

    //? This is the arrow logic controls
    if (n > SLIDES.length) {
        slideIndex[no] = 1;
    } else if (n < 1) {
        slideIndex[no] = SLIDES.length;
    }

    document.querySelector(`#${slideId[no]} .current-slide-num`).innerHTML =
        slideIndex[no];
    document.querySelector(`#${slideId[no]} .last-slide-num`).innerText =
        SLIDES.length;

    //* Remove all "show" classes in slides
    SLIDES.forEach((slide) => {
        slide.classList.remove("show");
    });

    //* Remove all "active" classes in slides
    DOTS.forEach((dot) => {
        dot.classList.remove("active");
    });

    //* Add the classes to the current slide
    SLIDES[slideIndex[no] - 1].classList.add("show");
    DOTS[slideIndex[no] - 1].classList.add("active");
}

// Start showing slide
showSlide(1, 0);
showSlide(1, 1);
