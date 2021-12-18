// свипер
let swiper = new Swiper(".swiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  // pagination: {
  //   el: ".swiper-pagination",
  //   clickable: true,
  // },
  // initialSlide: 1,
});

// ссылки слева
let headerFollowUs = document.querySelector(".header-followUs");
headerFollowUs.style.right = `-${headerFollowUs.clientWidth + 4}px`;

// попап
let btnMint = document.querySelector(".btn-Rarity");
let pageX = window.innerWidth;
let pageY = window.innerHeight;
let popupClose = document.querySelector(".modal-popup-close");
let modalPopup = document.querySelector(".modal-popup");
let modalPopupInner = document.querySelector(".modal-popup-inner");

btnMint.addEventListener("click", () => {
  showPopup();
  let modalPopupX = modalPopupInner.getBoundingClientRect().width / 2;
  let modalPopupY = modalPopupInner.getBoundingClientRect().height / 2;

  modalPopupInner.style.left = pageX / 2 - modalPopupX + "px";
  modalPopupInner.style.top = pageY / 2 - modalPopupY + "px";
});

popupClose.addEventListener("click", () => {
  hiddenPopup();
});

function showPopup() {
  modalPopup.style.transform = "translateY(0)";
}

function hiddenPopup() {
  modalPopup.style.transform = "translateY(-100%)";
}

// firefly

let body = document.querySelector("body");
const fireflyFun = (params) => {
  let fireFly = document.createElement("div");
  fireFly.classList.add("circle");
  fireFly.classList.add(`circle${params}`);
  body.appendChild(fireFly);
  setInterval(() => {
    let randomPositTop = Math.random() * (100 - 0) + 0;
    let randomPositLeft = Math.random() * (100 - 0) + 0;
    let randomScale = Math.random() * (3 - 0.5) + 0.5;
    flyFire(randomPositTop, randomPositLeft, randomScale);
  }, 5000);

  setInterval(() => {
    fireFly.style.opacity = 0.3;
  }, 2000);
  setInterval(() => {
    fireFly.style.opacity = 1;
  }, 5000);
  function flyFire(top, left, scale) {
    fireFly.style.transform = `scale(${scale})`;
    fireFly.style.top = top + "%";
    fireFly.style.left = left + "%";
    fireFly.style.opacity = 1;
  }
};

function renderFlr(num) {
  for (let i = 0; i < num; i++) {
    fireflyFun(i);
  }
}

renderFlr(3);

// timer

function getTimeRemaining(endtime) {
  let t = Date.parse(endtime) - Date.parse(new Date());
  let seconds = Math.floor((t / 1000) % 60);
  let minutes = Math.floor((t / 1000 / 60) % 60);
  let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  let days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

function initializeClock(id, endtime) {
  let clock = document.getElementById(id);
  let daysSpan = clock.querySelector(".days");
  let hoursSpan = clock.querySelector(".hours");
  let minutesSpan = clock.querySelector(".minutes");
  let secondsSpan = clock.querySelector(".seconds");

  function updateClock() {
    let t = getTimeRemaining(endtime);

    if (t.total <= 0) {
      document.getElementById("countdown").className = "hidden";
      document.getElementById("deadline-message").className = "visible";
      document.getElementById(
        "deadline-message"
      ).innerHTML = '<button class="btnMint">Mint</button>';
      clearInterval(timeinterval);
      return true;
    }

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
    minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
    secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
  }

  updateClock();
  let timeinterval = setInterval(updateClock, 1000);
}

// let deadline = "September 25 2022 00:00:00 GMT+0200"; //for Ukraine
let deadline = new Date(Date.parse(new Date()) + 3 * 1000); // for endless timer
initializeClock("countdown", deadline);
