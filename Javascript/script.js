(function() {
    "use strict";
  
    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }
  
    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all)
      if (selectEl) {
        if (all) {
          selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
          selectEl.addEventListener(type, listener)
        }
      }
    }
  
    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener)
    }
  
    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
      let position = window.scrollY + 200
      navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return
        let section = select(navbarlink.hash)
        if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active')
        } else {
          navbarlink.classList.remove('active')
        }
      })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)
  
    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
      let header = select('#header')
      let offset = header.offsetHeight
  
      if (!header.classList.contains('header-scrolled')) {
        offset -= 16
      }
  
      let elementPos = select(el).offsetTop
      window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth'
      })
    }
  
    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    if (selectHeader) {
      const headerScrolled = () => {
        if (window.scrollY > 100) {
          selectHeader.classList.add('header-scrolled')
        } else {
          selectHeader.classList.remove('header-scrolled')
        }
      }
      window.addEventListener('load', headerScrolled)
      onscroll(document, headerScrolled)
    }
  
    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add('active')
        } else {
          backtotop.classList.remove('active')
        }
      }
      window.addEventListener('load', toggleBacktotop)
      onscroll(document, toggleBacktotop)
    }
  
    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e) {
      select('#navbar').classList.toggle('navbar-mobile')
      this.classList.toggle('bi-list')
      this.classList.toggle('bi-x')
    })
  
    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function(e) {
      if (select('#navbar').classList.contains('navbar-mobile')) {
        e.preventDefault()
        this.nextElementSibling.classList.toggle('dropdown-active')
      }
    }, true)
  
    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function(e) {
      if (select(this.hash)) {
        e.preventDefault()
  
        let navbar = select('#navbar')
        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile')
          let navbarToggle = select('.mobile-nav-toggle')
          navbarToggle.classList.toggle('bi-list')
          navbarToggle.classList.toggle('bi-x')
        }
        scrollto(this.hash)
      }
    }, true)
  
    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
      if (window.location.hash) {
        if (select(window.location.hash)) {
          scrollto(window.location.hash)
        }
      }
    });
  
    /**
     * Preloader
     */
    let preloader = select('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.remove()
      });
    }
  
    /**
     * Testimonials slider
     */
    new Swiper('.testimonials-slider', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 40
        },
  
        1200: {
          slidesPerView: 3,
          spaceBetween: 40
        }
      }
    });
  
    /**
     * Porfolio isotope and filter
     */
    window.addEventListener('load', () => {
      let portfolioContainer = select('.portfolio-container');
      if (portfolioContainer) {
        let portfolioIsotope = new Isotope(portfolioContainer, {
          itemSelector: '.portfolio-item'
        });
  
        let portfolioFilters = select('#portfolio-flters li', true);
  
        on('click', '#portfolio-flters li', function(e) {
          e.preventDefault();
          portfolioFilters.forEach(function(el) {
            el.classList.remove('filter-active');
          });
          this.classList.add('filter-active');
  
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          portfolioIsotope.on('arrangeComplete', function() {
            AOS.refresh()
          });
        }, true);
      }
  
    });
  
    /**
     * Initiate portfolio lightbox 
     */
    const portfolioLightbox = GLightbox({
      selector: '.portfolio-lightbox'
    });
  
    /**
     * Portfolio details slider
     */
    new Swiper('.portfolio-details-slider', {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });
  
    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      })
    });
  
    /**
     * Initiate Pure Counter 
     */
    new PureCounter();
  
  })()


//////////////////////////////////


const texts = [
    "DISEÑO GRÁFICO",
    "DISEÑO WEB",
    "ILUSTRACIÓN",
    "FOTOGRAFÍA",
    "AUDIOVISUAL",
    "ANIMACIÓN",
    "DISEÑO EDITORIAL",
    "MULTIMEDIA"
];

let index = 0;
let textIndex = 0;
let currentText = "";
let letter = "";

const changingTextElement = document.getElementById("changing-text");
const cursorElement = document.createElement("span");
cursorElement.className = "cursor";
changingTextElement.appendChild(cursorElement);

(function type() {
    if (index === texts.length) {
        index = 0;
    }
    currentText = texts[index];
    letter = currentText.slice(0, ++textIndex);

    changingTextElement.textContent = letter;
    changingTextElement.appendChild(cursorElement); // Ensure cursor is always at the end
    if (letter.length === currentText.length) {
        index++;
        textIndex = 0;
        setTimeout(type, 2000); // Wait 2 seconds before changing text
    } else {
        setTimeout(type, 100);
    }
})();


// SKILLS CIRCLE

let circularProgress = document.querySelector(".circular-progress"),
    progressValue = document.querySelector(".progress-value");

let progressStartValue = 0,
    progressEndValue = 85,
    speed = 100;

let progress = setInterval(()=>{
    progressStartValue++;

    progressValue.textContent = `${progressStartValue}%`
    circularProgress.style.background = `conic-gradient(rgb(255, 115, 0) ${progressStartValue * 3.6}deg, rgb(245, 245, 245) 0deg)`

    if(progressStartValue == progressEndValue){
        clearInterval(progress);
    }
    console.log(progressStartValue) 
 
}, speed);

// PHOTOSHOP
let circularProgress1 = document.querySelector(".circular-progress1"),
    progressValue1 = document.querySelector(".progress-value1");

let progressStartValue1 = 0,
    progressEndValue1 = 75,
    speed1 = 100;

let progress1 = setInterval(()=>{
    progressStartValue1++;

    progressValue1.textContent = `${progressStartValue1}%`
    circularProgress1.style.background = `conic-gradient(rgb(139, 195, 252) ${progressStartValue1 * 3.6}deg, rgb(245, 245, 245) 0deg)`

    if(progressStartValue1 == progressEndValue1){
        clearInterval(progress1);
    }
    console.log(progressStartValue1) 
 
}, speed1);


// PREMIER
let circularProgress2 = document.querySelector(".circular-progress2"),
    progressValue2 = document.querySelector(".progress-value2");

let progressStartValue2 = 0,
    progressEndValue2 = 70,
    speed2 = 100;

let progress2 = setInterval(()=>{
    progressStartValue2++;

    progressValue2.textContent = `${progressStartValue2}%`
    circularProgress2.style.background = `conic-gradient(rgb(219, 118, 250) ${progressStartValue2 * 3.6}deg, rgb(245, 245, 245) 0deg)`

    if(progressStartValue2 == progressEndValue2){
        clearInterval(progress2);
    }
    console.log(progressStartValue2) 
 
}, speed2);

// AFTER EFFECT
let circularProgress3 = document.querySelector(".circular-progress3"),
    progressValue3 = document.querySelector(".progress-value3");

let progressStartValue3 = 0,
    progressEndValue3 = 50,
    speed3 = 100;

let progress3 = setInterval(()=>{
    progressStartValue3++;

    progressValue3.textContent = `${progressStartValue3}%`
    circularProgress3.style.background = `conic-gradient(rgb(207, 150, 253) ${progressStartValue3 * 3.6}deg, rgb(245, 245, 245) 0deg)`

    if(progressStartValue3 == progressEndValue3){
        clearInterval(progress3);
    }
    console.log(progressStartValue3) 
 
}, speed3);

// INDESIGN
let circularProgress4 = document.querySelector(".circular-progress4"),
    progressValue4 = document.querySelector(".progress-value4");

let progressStartValue4 = 0,
    progressEndValue4 = 80,
    speed4 = 100;

let progress4 = setInterval(()=>{
    progressStartValue4++;

    progressValue4.textContent = `${progressStartValue4}%`
    circularProgress4.style.background = `conic-gradient(rgb(231, 73, 160) ${progressStartValue4 * 3.6}deg, rgb(245, 245, 245) 0deg)`

    if(progressStartValue4 == progressEndValue4){
        clearInterval(progress4);
    }
    console.log(progressStartValue4) 
 
}, speed4);

// HTML
let circularProgress5 = document.querySelector(".circular-progress5"),
    progressValue5 = document.querySelector(".progress-value5");

let progressStartValue5 = 0,
    progressEndValue5 = 80,
    speed5 = 100;

let progress5 = setInterval(()=>{
    progressStartValue5++;

    progressValue5.textContent = `${progressStartValue5}%`
    circularProgress5.style.background = `conic-gradient(rgb(227, 76, 38) ${progressStartValue5 * 3.6}deg, rgb(245, 245, 245) 0deg)`

    if(progressStartValue5 == progressEndValue5){
        clearInterval(progress5);
    }
    console.log(progressStartValue5) 
 
}, speed5);

// CSS
let circularProgress6 = document.querySelector(".circular-progress6"),
    progressValue6 = document.querySelector(".progress-value6");

let progressStartValue6 = 0,
    progressEndValue6 = 75,
    speed6 = 100;

let progress6 = setInterval(()=>{
    progressStartValue6++;

    progressValue6.textContent = `${progressStartValue6}%`
    circularProgress6.style.background = `conic-gradient(rgb(0, 102, 255) ${progressStartValue6 * 3.6}deg, rgb(245, 245, 245) 0deg)`

    if(progressStartValue6 == progressEndValue6){
        clearInterval(progress6);
    }
    console.log(progressStartValue6) 
 
}, speed6);

// JAVASCRIPT
let circularProgress7 = document.querySelector(".circular-progress7"),
    progressValue7 = document.querySelector(".progress-value7");

let progressStartValue7 = 0,
    progressEndValue7 = 60,
    speed7 = 100;

let progress7 = setInterval(()=>{
    progressStartValue7++;

    progressValue7.textContent = `${progressStartValue7}%`
    circularProgress7.style.background = `conic-gradient(rgb(240, 219, 79) ${progressStartValue7 * 3.6}deg, rgb(245, 245, 245) 0deg)`

    if(progressStartValue7 == progressEndValue7){
        clearInterval(progress7);
    }
    console.log(progressStartValue7) 
 
}, speed6);

// PHP
let circularProgress8 = document.querySelector(".circular-progress8"),
    progressValue8 = document.querySelector(".progress-value8");

let progressStartValue8 = 0,
    progressEndValue8 = 50,
    speed8 = 100;

let progress8 = setInterval(()=>{
    progressStartValue8++;

    progressValue8.textContent = `${progressStartValue8}%`
    circularProgress8.style.background = `conic-gradient(rgb(71, 74, 138) ${progressStartValue8 * 3.6}deg, rgb(245, 245, 245) 0deg)`

    if(progressStartValue8 == progressEndValue8){
        clearInterval(progress8);
    }
    console.log(progressStartValue8) 
 
}, speed8);

// GIT HUB
let circularProgress9 = document.querySelector(".circular-progress9"),
    progressValue9 = document.querySelector(".progress-value9");

let progressStartValue9 = 0,
    progressEndValue9 = 70,
    speed9 = 100;

let progress9 = setInterval(()=>{
    progressStartValue9++;

    progressValue9.textContent = `${progressStartValue9}%`
    circularProgress9.style.background = `conic-gradient(rgb(68, 65, 64) ${progressStartValue9 * 3.6}deg, rgb(245, 245, 245) 0deg)`

    if(progressStartValue9 == progressEndValue9){
        clearInterval(progress9);
    }
    console.log(progressStartValue9) 
 
}, speed9);

// ADOBE ANIMATE 

let circularProgress10 = document.querySelector(".circular-progress10"),
    progressValue10 = document.querySelector(".progress-value10");

let progressStartValue10 = 0,
    progressEndValue10 = 60,
    speed10 = 100;

let progress10 = setInterval(()=>{
    progressStartValue10++;

    progressValue10.textContent = `${progressStartValue10}%`
    circularProgress10.style.background = `conic-gradient(rgb(57, 54, 101) ${progressStartValue10 * 3.6}deg, rgb(245, 245, 245) 0deg)`

    if(progressStartValue10 == progressEndValue10){
        clearInterval(progress10);
    }
    console.log(progressStartValue10) 
 
}, speed10);

// ADOBE XD 

let circularProgress11 = document.querySelector(".circular-progress11"),
    progressValue11 = document.querySelector(".progress-value11");

let progressStartValue11 = 0,
    progressEndValue11 = 70,
    speed11 = 100;

let progress11 = setInterval(()=>{
    progressStartValue11++;

    progressValue11.textContent = `${progressStartValue11}%`
    circularProgress11.style.background = `conic-gradient(rgb(231, 73, 160) ${progressStartValue11 * 3.6}deg, rgb(245, 245, 245) 0deg)`

    if(progressStartValue11 == progressEndValue11){
        clearInterval(progress11);
    }
    console.log(progressStartValue11) 
 
}, speed11);

// ADOBE AUDITION 

let circularProgress12 = document.querySelector(".circular-progress12"),
    progressValue12 = document.querySelector(".progress-value12");

let progressStartValue12 = 0,
    progressEndValue12 = 60,
    speed12 = 100;

let progress12 = setInterval(()=>{
    progressStartValue12++;

    progressValue12.textContent = `${progressStartValue12}%`
    circularProgress12.style.background = `conic-gradient(rgb(0, 228, 187) ${progressStartValue12 * 3.6}deg, rgb(245, 245, 245) 0deg)`

    if(progressStartValue12 == progressEndValue12){
        clearInterval(progress12);
    }
    console.log(progressStartValue12) 
 
}, speed12);

// FIGMA

let circularProgress13 = document.querySelector(".circular-progress13"),
    progressValue13 = document.querySelector(".progress-value13");

let progressStartValue13 = 0,
    progressEndValue13 = 60,
    speed13 = 100;

let progress13 = setInterval(()=>{
    progressStartValue13++;

    progressValue13.textContent = `${progressStartValue13}%`
    circularProgress13.style.background = `conic-gradient(rgb(45, 208, 205) ${progressStartValue13 * 3.6}deg, rgb(245, 245, 245) 0deg)`

    if(progressStartValue13 == progressEndValue13){
        clearInterval(progress13);
    }
    console.log(progressStartValue13) 
 
}, speed13);

// WORDPRESS

let circularProgress14 = document.querySelector(".circular-progress14"),
    progressValue14 = document.querySelector(".progress-value14");

let progressStartValue14 = 0,
    progressEndValue14 = 50,
    speed14 = 100;

let progress14 = setInterval(()=>{
    progressStartValue14++;

    progressValue14.textContent = `${progressStartValue14}%`
    circularProgress14.style.background = `conic-gradient(rgb(33, 117, 155) ${progressStartValue14 * 3.6}deg, rgb(245, 245, 245) 0deg)`

    if(progressStartValue14 == progressEndValue14){
        clearInterval(progress14);
    }
    console.log(progressStartValue14) 
 
}, speed14);

// BOOTSTRAP

let circularProgress15 = document.querySelector(".circular-progress15"),
    progressValue15 = document.querySelector(".progress-value15");

let progressStartValue15 = 0,
    progressEndValue15 = 80,
    speed15 = 100;

let progress15 = setInterval(()=>{
    progressStartValue15++;

    progressValue15.textContent = `${progressStartValue15}%`
    circularProgress15.style.background = `conic-gradient(rgb(88, 59, 126) ${progressStartValue15 * 3.6}deg, rgb(245, 245, 245) 0deg)`

    if(progressStartValue15 == progressEndValue15){
        clearInterval(progress15);
    }
    console.log(progressStartValue15) 
 
}, speed15);