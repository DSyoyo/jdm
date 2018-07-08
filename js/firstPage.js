/**
 * Created by 90380 on 2018/6/1.
 */

//功能1：头部背景色随着滚动条改变颜色
;(function () {

  var header = document.querySelector(".jd_header");

  window.addEventListener("scroll", function (e) {
    var opacity = 0;
    var scrollTop = window.pageYOffset;

    if (scrollTop <= 500) {
      opacity = scrollTop / 500 * 0.9;
    } else {
      opacity = 0.9;
    }
    header.style.backgroundColor = "rgba(222, 24, 27, " + opacity + ")";
  })

})();

//功能2：秒杀时间？

;(function () {

  var spans = document.querySelectorAll(".seckill-title span:nth-child(odd)");
  setTime();
  function setTime() {
    var nowTime = new Date();
    var future = new Date(2018, 5, 2, 16, 0, 0);

    var time = parseInt(future - nowTime) / 1000;

    if (time <= 0) {
      time = 0;
    }

    var hours = parseInt(time / 60 / 60);
    var minutes = parseInt(time / 60 % 24);
    var seconds = parseInt(time % 60);

    spans[0].innerText = addZero(hours);
    spans[1].innerText = addZero(minutes);
    spans[2].innerText = addZero(seconds);

    function addZero(n) {
      return n = n < 10 ? "0" + n : n;
    }

  }

  setInterval(setTime, 1000);

})();


//功能3；动态获取ul的宽度

;(function () {
  var ul = document.querySelector(".seckill-content >ul");
  var lis = ul.querySelectorAll("li");

  var total = 0;
  lis.forEach(function (e) {
    total += e.offsetWidth;
  })

  ul.style.width = total + 10 + "px";

})();


//功能四：京东快报滚动

;(function () {
  var ul = document.querySelector(".jd_news .info ul");
  var lis = ul.querySelectorAll("li");
  var liHeight = lis[0].offsetHeight;
  var index = 0;
  //思路：
  //1. 开启一个定时器， 2秒动一次
  //2. 让ul每次往上移动一个li的高度
  //3. 当移动到最后一个li的时候，瞬间跳转回第一个

  setInterval(function () {
    index++;

    ul.style.transition = "all .5s";
    ul.style.webkitTransition = "all .5s";

    ul.style.transform = "translateY(" + (-index * liHeight) + "px)";
    ul.style.webkitTransform = "translateY(" + (-index * liHeight) + "px)";
  }, 1000);

  ul.addEventListener("transitionend", function () {
    if (index >= lis.length - 1) {
      index = 0;
      ul.style.transition = "none";
      ul.style.webkitTransition = "none";

      ul.style.transform = "translateY(0px)";
      ul.style.webkitTransform = "translateY(0px)";
    }

  })

})();

//功能5.banner轮播图

;(function () {
  var banner = document.querySelector(".jd_banner");
  var ul = banner.querySelector("ul");
  var imgs = ul.querySelectorAll("li");
  var ol = banner.querySelector("ol");
  var points = ol.querySelectorAll("li");

  var liWidth = banner.offsetWidth;
  var count = 1;
  var timeId = setInterval(function () {
    count++;
    //添加过渡
    addTransition();
    setTranslateX(-count * liWidth);

  }, 1000);

  ul.addEventListener("transitionend", function () {
    //若是最后一张，瞬间变回第一张
    if (count >= imgs.length - 1) {
      count = 1;
    }

    if (count <= 0) {
      count = imgs.length - 2;
    }

    //删除过渡
    removeTransition();
    setTranslateX(-count * liWidth);

    //同步小圆点

    points.forEach(function (e) {
      e.classList.remove("now");
    })
    points[count - 1].classList.add("now");

  })


  var startX = 0;
  var startTime = 0;
  ul.addEventListener("touchstart", function (e) {
    clearInterval(timeId);
    startX = e.touches[0].clientX;
    startTime = new Date();
  })

  ul.addEventListener("touchmove", function (e) {
    var distance = e.touches[0].clientX - startX;
    removeTransition();
    setTranslateX(-count*liWidth + distance);
  })

  ul.addEventListener("touchend",function (e) {
    var distance = e.changedTouches[0].clientX-startX;
    var duration = new Date() - startTime;

    if (distance >= liWidth/3 || (duration <= 200 && distance >= 50)) {
      count--;
    }
    if (distance <= - liWidth/3 || (duration <= 200 && distance <= -50)) {
      count++;
    }

    addTransition();
    setTranslateX(-count *liWidth);

    timeId = setInterval(function () {
      count++;
      addTransition();
      setTranslateX(-count*liWidth);
    },1000);

    window.addEventListener("resize",function () {
      liWidth = banner.offsetWidth;
      setTranslateX(-count*liWidth);
    })

  })


  function addTransition() {
    ul.style.transition = "all .5s";
    ul.style.webkitTransition = "all .5s";
  }

  function removeTransition() {
    ul.style.transition = "none";
    ul.style.webkitTransition = "none";
  }

  function setTranslateX(value) {
    ul.style.transform = "translateX(" + value + "px)";
    ul.style.webkitTransform = "translateX(" + value + "px)";
  }
})();

