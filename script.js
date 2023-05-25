'use strict';

const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    if (href == "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    if (link.classList.contains("nav-link"))
      navEl.classList.toggle("nav-open");
  });
});

// document.querySelector('#contact-form').addEventListener('submit', (e) => {
//   e.preventDefault();
//   e.target.elements.name.value = '';
//   e.target.elements.email.value = '';
//   e.target.elements.message.value = '';
// });

const btns = document.querySelectorAll(".btn");
const btnsContainer = document.querySelector(".btns-container");
const tabsContent = document.querySelectorAll(".tab-content");

btnsContainer.addEventListener("click", function(e){
  const clicked = e.target.closest(".btn");
  if(!clicked) return;
  btns.forEach(b => b.classList.remove("btn-active"));
  tabsContent.forEach(t => t.classList.remove("tab-content-active"));

  clicked.classList.add("btn-active");

  document.querySelector(`.tab-${clicked.dataset.tab}`).classList.add("tab-content-active");
});

///////////////////////////////////////////////////////////////
// Section Animation
const allSections= document.querySelectorAll(".section");

const revealSection = function (entries, observer){
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section-hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver 
(revealSection, {
  root: null,
  threshold: 0.15,
});


allSections.forEach(function (section){
  sectionObserver.observe(section);
  section.classList.add("section-hidden");
});

///////////////////////////////////////////////////////////////
// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

///////////////////////////////////////////////////////////////
// Glow Letters Hero Section
const letters = document.querySelectorAll(".letter");
const lettersCont = document.querySelector(".hero-section-visual");

lettersCont.addEventListener("click", function(e){
  const clicked = e.target.closest(".letter");
  if(!clicked) return;
  clicked.classList.toggle("glow");
});


///////////////////////////////////////////////////////////////
// Mobile Nav 
const btnNavEl = document.querySelector(".btn-mobile-nav");
const navEl = document.querySelector(".main-nav");

btnNavEl.addEventListener("click", function () {
  navEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
// Sticky navigation
const sectionHeroEl = document.querySelector(".hero-section");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (ent.isIntersecting == false) {
      navEl.classList.add("sticky");
    }

    if (ent.isIntersecting == true) {
      navEl.classList.remove("sticky");
    }
  },

  {
    root: null,
    threshold: 0,
  }
);
obs.observe(sectionHeroEl);
