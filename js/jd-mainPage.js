/**
 * Created by 90380 on 2018/5/30.
 */

//功能1：头部的背景色随着滚动条透明度改变，到0.9
;(function () {
  var header = document.querySelector(".jd_header");

  window.addEventListener("scroll", function () {

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


//功能2：秒杀商品中ul的长度
;(function () {
  //思路：
  //1. 获取到ul和ul下所有的li
  //2. 遍历所有的li，把宽度加起来就行。
  var ul = document.querySelector(".seckill-content >ul");
  var lis = ul.querySelectorAll("li");

  var total = 0;
  lis.forEach(function (e) {
    total += e.offsetWidth;
  })
  ul.style.width = total + 10 + "px";

})();

//功能3：秒杀商品中的倒计时
;(function () {
  var spans = document.querySelectorAll(".seckill-title span:nth-child(odd)");

  //先调用一次
  setTime();
  function setTime() {
    var nowTime = new Date();
    var futureTime = new Date(2018, 4, 31, 12, 0, 0);
    var secTime = parseInt((futureTime - nowTime) / 1000);

    //判断如果时间《=0.等于0
    if (secTime <= 0) {
      secTime = 0;
    }

    var hours = parseInt(secTime / 60 / 60);
    var minutes = parseInt(secTime / 60 / 24);
    var seconds = parseInt(secTime % 60);

    spans[0].innerText = addZero(hours);
    spans[1].innerText = addZero(minutes);
    spans[2].innerText = addZero(seconds);

    function addZero(n) {
      return n <= 10 ? "0" + n : n;
    }

  }

  //开启定时器
  setInterval(setTime, 1000);

})();

//功能4：新闻快报new列表
;(function () {
  var ul = document.querySelector(".jd_news .info ul");
  var lis = ul.querySelectorAll("li");
  var liHeight = lis[0].offsetHeight;

  var count = 0;
  setInterval(function () {
    count++;
    ul.style.transition = "all .5s";
    ul.style.webkitTransition = "all .5s";

    ul.style.transform = "translateY(-" + liHeight * count + "px)";
    ul.style.webkitTransform = "translateY(-" + liHeight * count + "px)";
  }, 1000);

  ul.addEventListener("transitionend", function () {
    if (count >= lis.length - 1) {
      count = 0;
      ul.style.transition = "none";
      ul.style.webkitTransition = "none";

      ul.style.transform = "translateY(0px)";
      ul.style.webkitTransform = "translateY(0px)";
    }

  })


})();

//功能5：banner轮播图
;(function () {
  var banner = document.querySelector(".jd_banner");
  var ul = document.querySelector(".jd_banner ul");
  var imgs = ul.querySelectorAll("li");
  var ol = document.querySelector(".jd_banner ol");
  var points = ol.querySelectorAll("li");

  var liWidth = banner.offsetWidth;
  var count = 1;

  var timeId = setInterval(function () {
    count++;
    //ul.style.transition = "all .5s";
    //ul.style.webkitTransition = "all .5s";
    addTransition();

    //ul.style.transform = "translateX(-" + count * liWidth + "px)";
    // ul.style.webkitTransform = "translateX(-" + count * liWidth + "px)";

    addTranslateX(-count * liWidth);

  }, 1000);


  ul.addEventListener("transitionend", function () {
    if (count >= imgs.length - 1) {
      count = 1;
    }
    if (count <= 0) {
      count = imgs.length - 2;
    }

    //ul.style.transition = "none";
    //ul.style.webkitTransition = "none";
    removeTransition();

    //ul.style.transform = "translateX(-" + count * liWidth + "px)";
    //ul.style.webkitTransform = "translateX(-" + count * liWidth + "px)";

    addTranslateX(-count * liWidth);

    //注册结束事件后，同步小圆点
    points.forEach(function (e) {
      e.classList.remove("now");
    })
    points[count - 1].classList.add("now");
  });

  //给ul注册3个触摸touchstart,touchmove,touchend事件

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
    addTranslateX(-count * liWidth + distance);


  })

//支持快速滑动，  如果持续时间<200ms,只需要滑动距离超过50px就算滑动成功
  ul.addEventListener("touchend", function (e) {
    var distance = e.changedTouches[0].clientX - startX;
    var duration = new Date() - startTime;

    if (distance >= liWidth / 3 || (duration <= 200 && distance >= 50)) {
      count--;
    }
    if (distance <= -liWidth / 3 || (duration <= 200 && distance <= -50)) {
      count++;
    }

    addTransition();
    addTranslateX(-count * liWidth);

    timeId = setInterval(function () {
      count++;

      addTransition();

      addTranslateX(-count * liWidth);

    }, 1000);

  })
  //给window注册resieze事件，动态的修改的liWidth的值

  window.addEventListener("resize",function () {
    liWidth = banner.offsetWidth;
    addTranslateX(-count*liWidth);

  })

  function addTransition() {
    ul.style.transition = "all .5s";
    ul.style.webkitTransition = "all .5s";
  }

  function removeTransition() {
    ul.style.transition = "none";
    ul.style.webkitTransition = "none";
  }

  function addTranslateX(value) {
    ul.style.transform = "translateX(" + value + "px)";
    ul.style.webkitTransform = "translateX(" + value + "px)";
  }


})();


//功能5：banner轮播图
//;(function () {
//  var banner = document.querySelector(".jd_banner");
//  var ul = banner.querySelector("ul");
//  var imgs = ul.querySelectorAll("li");
//  var ol = banner.querySelector("ol");
//  var points = ol.querySelectorAll("li");
//
//  //------由于前面加了一张假图片，所以count要从1开始-----
//  var count = 1;
//  var liWidth = banner.offsetWidth;
//
//  //开始定时器
//  var timeId = setInterval(function () {
//    count++;
//    //ul.style.transition = "all .5s";
//    //ul.style.webkitTransition = "all .5s";
//    addTransition();
//
//    //ul.style.transform = "translateX(-" + count * liWidth + "px)";
//    //ul.style.webkitTransform = "translateX(-" + count * liWidth + "px)";
//    addTranslateX(-count * liWidth);
//
//  }, 1000)
//
//  //给ul注册事件结束事件
//  ul.addEventListener("transitionend", function () {
//    //判断图片是最后一张，瞬间变回第一张
//    if (count >= imgs.length - 1) {
//      count = 1;
//      //ul.style.transition = "none";
//      //ul.style.webkitTransition = "none";
//      removeTransition();
//
//      //ul.style.transform = "translateX(-" + count * liWidth + "px)";
//      //ul.style.webkitTransform = "translateX(-" + count * liWidth + "px)";
//      addTranslateX(-count * liWidth);
//    }
//    //判断如果是第0张，瞬间变回倒数第二张
//    if (count <= 0) {
//      count = imgs.length - 2;
//    }
//
//    //过渡事件结束后，小圆点动
//    points.forEach(function (e) {
//      e.classList.remove("now");
//    })
//    points[count - 1].classList.add("now");
//  });
//
//
////给ul注册3个touch事件
//
//  var startX = 0;
//  //1.给ul注册触摸开始事件
//  ul.addEventListener("touchstart", function (e) {
//    //清理定时器
//    clearInterval(timeId);
//    //记录下开始的位置
//    startX = e.touches[0].clientX;
//
//  })
//
//  //2.给ul注册触摸移动事件
//  ul.addEventListener("touchmove", function (e) {
//    //获取触摸时移动的距离
//    var distance = e.touches[0].clientX - startX;
//    //移除过渡事件
//    removeTransition();
//    // 让ul的translateX加上移动的距离
//    addTranslateX(-count * liWidth + distance);
//
//  })
//
//
//  //3.给ul注册离开事件
//
//  ul.addEventListener("touchend", function (e) {
//
//    //01获取到结束时的位置，计算最终移动的距离，根据距离进行判断。
//    var distance = e.changedTouches[0].clientX - startX;
//
//    //02判断移动距离是否超过1/3屏，判断上一屏还是下一屏，或者是吸附
//    if (distance >= liWidth / 3) {
//      count--;
//    }
//    if (distance <= -liWidth / 3) {
//      count++;
//    }
//    //03添加过渡
//    addTransition();
//    //04执行动画
//    addTranslateX(-count * liWidth);
//    //05重新开启定时器
//
//    timeId = setInterval(function () {
//      count++;
//      addTransition();
//      addTranslateX(-count * liWidth);
//    }, 1000)
//
//  })
//
//
////封装添加动画函数
//  function addTransition() {
//    ul.style.transition = "all .5s";
//    ul.style.webkitTransition = "all .5s";
//  }
//
//  //封装移除动画函数
//  function removeTransition() {
//    ul.style.transition = "none";
//    ul.style.webkitTransition = "none";
//  }
//
//  //封装添加translateX值
//  function addTranslateX(value) {
//    ul.style.transform = "translateX(" + value + "px)";
//    ul.style.webkitTransform = "translateX(" + value + "px)";
//  }
//
//
//})();