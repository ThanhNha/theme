function header() {
  var header = gsap.to("#header", { y: "-=200", duration: 0.2, ease: "power2.in", paused: true });
  //fixed header
  ScrollTrigger.create({
    trigger: "#header",
    start: "10px top",
    end: 99999,
    toggleClass: { className: "scrolled", targets: "#header" },
    onUpdate: ({ progress, direction, isActive }) => {
      if (direction == -1) {
        header.reverse();
      }
      if (direction == 1) {
        header.play();
      } else if (direction == 1 && isActive == true) {
        header.play();
      }
    },
  });
}
header();
const hamburger = document.querySelector("#hamburger");
let body = document.querySelector("body");
let menu = document.querySelector(".menu-sidebar");
let menu_mobile = document.querySelector(".menu-mobile");
let icon_close_mobile = document.querySelector("#hamburger_mobile");
let overlay = document.querySelector("#overlay");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  body.classList.toggle("overflow-hidden");
  menu.classList.toggle("open");
  menu_mobile.classList.toggle("active");
  overlay.classList.toggle("active");
});
icon_close_mobile.addEventListener("click", () => {
  menu_mobile.classList.remove("active");
  hamburger.classList.toggle("active");
  overlay.classList.toggle("active");
});
let search = document.querySelector("#search");
search.addEventListener("click", function () {
  search.classList.toggle("active");
});

function init() {
  const loader = document.querySelector(".loader");

  // reset position of the loading screen
  gsap.set(loader, {
    scaleX: 0,
    rotation: 0,
    xPercent: 0,
    yPercent: -50,
    transformOrigin: "left center",
    autoAlpha: 1,
  });

  function loaderIn() {
    // GSAP tween to stretch the loading screen across the whole screen
    return gsap.fromTo(
      loader,
      {
        rotation: 0,
        scaleX: 0,
        xPercent: 0,
      },
      {
        duration: 0.8,
        xPercent: 0,
        scaleX: 1,
        rotation: 0,
        ease: "Power4.inOut",
        transformOrigin: "left center",
      }
    );
  }

  function loaderAway() {
    // GSAP tween to hide the loading screen
    return gsap.to(loader, {
      duration: 0.8,
      scaleX: 0,
      xPercent: 0,
      rotation: 0,
      transformOrigin: "right center",
      ease: "Power4.inOut",
    });
  }

  // do something before the transition starts
  barba.hooks.before(() => {
    document.querySelector("html").classList.add("is-transitioning");
    barba.wrapper.classList.add("is-animating");
  });

  // do something after the transition finishes
  barba.hooks.after(() => {
    document.querySelector("html").classList.remove("is-transitioning");
    barba.wrapper.classList.remove("is-animating");
  });

  // scroll to the top of the page
  barba.hooks.enter(() => {
    window.scrollTo(0, 0);
  });

  barba.init({
    transitions: [
      {
        async leave() {
          await loaderIn();
        },
        enter() {
          loaderAway();
        },
      },
    ],
  });
}
init();

// sub menu bar

let Sub_icon = document.querySelectorAll(".icon-dropdown");
let Sub_menu = document.querySelectorAll(".sub-menu");

Sub_icon.forEach((item, i) => {
  item.addEventListener("click", () => {
    Sub_menu[i].classList.toggle("active");
  });
});
