//burger menu
document.querySelector(".burger-trigger").addEventListener("click", function (event) {
  document.querySelector(".burger").classList.toggle("active");
  event.currentTarget.classList.toggle("active");
});
function countUp(targetElement, targetNumber, duration) {
  var stepMultiplier = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var start = 0;
  var startTime = null;
  function updateNumber(timestamp) {
    if (!startTime) startTime = timestamp;
    var progress = (timestamp - startTime) / duration;
    var currentNumber = Math.min(Math.floor(progress * targetNumber * stepMultiplier), targetNumber);
    targetElement.innerText = currentNumber;
    if (currentNumber < targetNumber) {
      requestAnimationFrame(updateNumber);
    }
  }
  requestAnimationFrame(updateNumber);
}
$("#slider-sponsors").slick({
  dots: true,
  infinite: false,
  speed: 300,
  slidesToShow: 6,
  slidesToScroll: 6,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [{
    breakpoint: 1480,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 4,
      infinite: true,
      dots: true
    }
  }, {
    breakpoint: 1024,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3,
      infinite: true,
      dots: true
    }
  }, {
    breakpoint: 600,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2
    }
  }, {
    breakpoint: 480,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1
    }
  }]
});
ScrollTrigger.create({
  trigger: "#section-2",
  start: "top center",
  once: true,
  // 只觸發一次
  onEnter: function onEnter() {
    var tl = gsap.timeline();
    tl.add(function () {
      return countUp(document.getElementById("counter1"), 120, 2000, 6);
    }).add(function () {
      return countUp(document.getElementById("counter2"), 70, 2000, 2);
    }) // 等前面 2 秒完成
    .add(function () {
      return countUp(document.getElementById("counter3"), 50, 2000, 2);
    }); // 再等 2 秒
  }
});
var tl_s4 = gsap.timeline({
  scrollTrigger: {
    trigger: "#section-4",
    start: "top center",
    // 讓動畫更早開始
    toggleActions: "play none none none"
  }
});
tl_s4.to("#section-4 .box-1", {
  onStart: function onStart() {
    return document.querySelector("#section-4 .box-1").classList.add("image-clip");
  }
}).to("#section-4 .box-2", {
  onStart: function onStart() {
    return document.querySelector("#section-4 .box-2").classList.add("glowing-circle");
  }
}); // 讓 box-2 稍微疊加執行

function animateBoxes(section) {
  // 設定初始狀態，讓元素從下方浮出
  gsap.set("".concat(section, " .box-animate"), {
    opacity: 0,
    y: 50
  });
  ScrollTrigger.batch("".concat(section, " .box-animate"), {
    start: "top center",
    // 這個區塊的 .box-animate 進入視口時開始
    once: false,
    // 設 true 只執行一次，false 會每次滾動時觸發
    onEnter: function onEnter(batch) {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.2 // 依序出現
      });
    }
  });
}
animateBoxes("#section-3");
animateBoxes("#section-5");
animateBoxes("#section-6");
animateBoxes("#section-7");

// ScrollTrigger.batch("#section-6 .box-animate", {
//   start: "top center", // 這個區塊的 .box-animate 進入視口時開始
//   once: false, // 設 true 只執行一次，false 會每次滾動時觸發
//   onEnter: (batch) => {
//     gsap.from(batch, {
//       autoAlpha: 0,
//       y: 50,
//       duration: 0.8,
//       ease: "power2.out",
//       stagger: 0.2, // 依序出現
//     });
//   },
// });

// ScrollTrigger.batch("#section-7 .box-animate", {
//   start: "top center", // 這個區塊的 .box-animate 進入視口時開始
//   once: false, // 設 true 只執行一次，false 會每次滾動時觸發
//   onEnter: (batch) => {
//     gsap.from(batch, {
//       autoAlpha: 0,
//       y: 50,
//       duration: 0.8,
//       ease: "power2.out",
//       stagger: 0.2, // 依序出現
//     });
//   },
// });

//pre-loading-effect
window.addEventListener("load", function () {
  var loadingScreen = document.getElementById("loading-screen");
  setTimeout(function () {
    loadingScreen.classList.add("hidden"); // 讓 loading 畫面淡出
    document.body.classList.add("loaded"); // 觸發頁面動畫
  }, 500); // 可調整延遲時間，確保 loading 有展示
});