/**
 * Created by 90380 on 2018/6/4.
 */

//功能1：头部背景色渐变效果
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
    header.style.backgroundColor = "rgba(222, 24, 27," + opacity + ")";
  })

})();

//功能2:倒计时

;(function () {
  var spans = document.querySelectorAll(".time span:nth-child(odd)");

  function getTime() {
    var nowTime = new Date();
    var future = new Date(2018, 5, 5, 18, 0, 0);
    var time = parseInt(future - nowTime) / 1000;
    if (time <= 0) {
      time = 0;
      clearInterval(timeId);
    }

    var hours = parseInt(time / 60 / 60);
    var minutes = parseInt(time / 60 % 24);
    var seconds = parseInt(time % 60);

    spans[0].innerText = addZero(hours);
    spans[1].innerText = addZero(minutes);
    spans[2].innerText = addZero(seconds);

    function addZero(n) {
      return n < 10 ? "0" + n : n;
    }

  }

  getTime();
  var timeId = setInterval(getTime, 1000)
  
})();


//功能3:秒杀商品的触摸滚动

;(function () {
  var lis = document.querySelectorAll(".seckill-content li");
  var liWidth = lis[0].offsetWidth;
  var ul = document.querySelector(".seckill-content ul");
  //动态计算Ul的宽度
  ul.style.width = liWidth * (lis.length - 10) + "px";

  window.addEventListener("load", function () {
    new IScroll(".seckill-content", {
      scrollY: false,
      scrollX: true
    })

  })
})();

//功能4：京东快报动态新闻

;(function () {
  var ul = document.querySelector(".info ul");
  var lis = ul.querySelectorAll("li");
  var liHeight = lis[0].offsetHeight;
  var count = 0;
  setInterval(function () {
    count++;
    ul.style.transition = "all .5s";
    ul.style.webkitTransition = "all .5s";
    ul.style.transform = "translateY(" + (-count * liHeight) + "px)";
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


//功能5：banner轮播图，定位板

window.addEventListener("load",function () {
  var banner = document.querySelector(".jd_banner");
  var ul = banner.querySelector("ul");
  var imgs = ul.querySelectorAll("li");
  var ol = banner.querySelector("ol");
  var points = ol.querySelectorAll("li");

  ul.style.height = imgs[0].offsetHeight + "px";

  var liWidth = banner.offsetWidth;

  var pre = imgs.length-1;
  var now = 0;
  var next = 1;

  imgs[pre].style.transform = "translateX("+ -liWidth +"px)";
  imgs[now].style.transform = "translateX(0px)";
  imgs[next].style.transform = "translateX("+ liWidth +"px)";


  function showNext() {
    imgs[pre].style.transition = "none";
    imgs[pre].style.transform = "translateX("+ 2*liWidth +"px)";

    pre = now;
    now = next;
    next++;

    if (next >imgs.length-1) {
      next = 0;
    }

    imgs[pre].style.transition = "all .2s";
    imgs[now].style.transition = "all .2s";
    imgs[next].style.transition = "none";

    imgs[pre].style.transform = "transalteX("+ -liWidth +"px)";
    imgs[now].style.transform = "translateX(0px)";
    imgs[next].style.transform = "translateX("+ liWidth +"px)";

    //同步小圆点

    points.forEach(function (e) {
      e.classList.remove("now");
    })

    points[now].classList.add("now");

  }

  function showpre() {
    imgs[next].style.transition = "none";
    imgs[next].style.transform = "translateX("+ 2*liWidth +"px)";

    next = now;
    now = pre;
    pre--;

    if (pre <= 0) {
      pre = imgs.length-1;
    }

    imgs[next].style.transition = "all .2s";
    imgs[now].style.transition = "all .2s";
    imgs[pre].style.transition = "none";

    imgs[next].style.transform = "translateX("+ liWidth +"px)";
    imgs[now].style.transform = "translateX(0px)";
    imgs[pre].style.transform = "translateX("+ -liWidth +"px)";


    points.forEach(function (e) {
      e.classList.remove("now");
    })
    points[now].classList.add("now");
  }

  setInterval(showNext,2000);

  //触摸事件

  var startX = 0;
  var startTime = 0;

  ul.addEventListener("touchstart",function (e) {
    startX = e.touches[0].clientX;
    clearInterval(timeId);
    startTime = new Date();
  })

  ul.addEventListener("touchmove",function (e) {
      var distance = e.touches[0].clientX-startX;

    //不需要过度效果
    imgs[prev].style.transition = "none";
    imgs[now].style.transition = "none";
    imgs[next].style.transition = "none";

    //改三个人的位置
    imgs[prev].style.transform = "translateX(" + (-liWidth+distance) + "px)";  //0
    imgs[now].style.transform = "translateX("+distance+"px)";  //1
    imgs[next].style.transform = "translateX(" + (liWidth + distance) + "px)";//2

  })












})

//功能5：banner轮播图
//window.addEventListener("load", function () {
//
//  var interval = 3000;
//
//  //1. 设置ul的高度， banner就会高度
//  var banner = document.querySelector(".jd_banner");
//  var ul = banner.querySelector("ul");
//  var imgs = ul.querySelectorAll("li");
//  var ol = banner.querySelector("ol");
//  var points = ol.querySelectorAll("li");
//
//  ul.style.height = imgs[0].offsetHeight + "px";
//  var liWidth = banner.offsetWidth;
//
//
//  //初始化3个关键的位置
//  var prev = imgs.length - 1;
//  var now = 0;
//  var next = 1;
//
//  //设置这个三个位置的图片
//  imgs[prev].style.transform = "translateX(" + -liWidth + "px)";
//  imgs[now].style.transform = "translateX(0px)";
//  imgs[next].style.transform = "translateX(" + liWidth + "px)";
//
//  //用于显示下一张
//  function showNext() {
//    //1. 让prev回到牌堆(瞬间回去)
//    imgs[prev].style.transition = "none";
//    imgs[prev].style.transform = "translateX(" + 2 * liWidth + "px)";
//
//    //2. 换图片
//    prev = now;
//    now = next;
//    next++;
//
//    //next最大最大能到7
//    if(next > imgs.length - 1) {
//      next = 0;
//    }
//
//    imgs[prev].style.transition = "all .2s";
//    imgs[now].style.transition = "all .2s";
//    //注意next不需要动画可为none
//    imgs[next].style.transition = "all .2s";
//    imgs[prev].style.transform = "translateX(" + -liWidth + "px)";  //0
//    imgs[now].style.transform = "translateX(0px)";  //1
//    imgs[next].style.transform = "translateX(" + liWidth + "px)";//2
//
//
//    //同步小圆点
//    points.forEach(function (e) {
//      e.classList.remove("now");
//    });
//    points[now].classList.add("now");
//
//  }
//
//  function showPrev() {
//    //1. 让next回到牌堆(瞬间回去)
//    imgs[next].style.transition = "none";
//    imgs[next].style.transform = "translateX(" + 2 * liWidth + "px)";
//
//    //2. 换图片
//    next = now;
//    now = prev;
//    prev--;
//    if(prev < 0) {
//      prev = imgs.length - 1;
//    }
//
//    imgs[prev].style.transition = "none";
//    imgs[now].style.transition = "all .2s";
//    //注意next不需要动画
//    imgs[next].style.transition = "all .2s";
//    imgs[prev].style.transform = "translateX(" + -liWidth + "px)";  //0
//    imgs[now].style.transform = "translateX(0px)";  //1
//    imgs[next].style.transform = "translateX(" + liWidth + "px)";//2
//
//
//    //同步小圆点
//    points.forEach(function (e) {
//      e.classList.remove("now");
//    });
//    points[now].classList.add("now");
//
//  }
//
//  var timeId = setInterval(showNext, interval);
//
//
//  //记录开始的位置
//  //记录开始的时间
//  //清除定时器
//  var startX = 0;
//  var startTime = 0;
//  ul.addEventListener("touchstart", function (e) {
//    startX = e.touches[0].clientX;
//    startTime = new Date();
//    clearInterval(timeId);
//  });
//
//  //获取距离，移动位置
//  ul.addEventListener("touchmove", function (e) {
//    var distance = e.touches[0].clientX - startX;
//
//    //不需要过度效果
//    imgs[prev].style.transition = "none";
//    imgs[now].style.transition = "none";
//    //注意next不需要动画
//    imgs[next].style.transition = "none";
//
//    //改三个人的位置
//    imgs[prev].style.transform = "translateX(" + (-liWidth+distance) + "px)";  //0
//    imgs[now].style.transform = "translateX("+distance+"px)";  //1
//    imgs[next].style.transform = "translateX(" + (liWidth + distance) + "px)";//2
//
//  });
//
//  //松手的时候，获取到松手的距离，判断滑动是否成功
//  ul.addEventListener("touchend", function (e) {
//
//    var distance = e.changedTouches[0].clientX - startX;
//    var duration = new Date() - startTime;
//
//    if(distance >= liWidth/3 || duration <= 200 && distance >= 50) {
//      //去上一屏
//      showPrev();
//    }else if(distance <= -liWidth/3 || duration <= 200 && distance <= -50) {
//      //去下一屏
//      showNext();
//    }else {
//      //回到当前屏
//      imgs[prev].style.transition = "all .2s";
//      imgs[now].style.transition = "all .2s";
//      //注意next不需要动画
//      imgs[next].style.transition = "all .2s";
//      imgs[prev].style.transform = "translateX(" + -liWidth + "px)";  //0
//      imgs[now].style.transform = "translateX(0px)";  //1
//      imgs[next].style.transform = "translateX(" + liWidth + "px)";//2
//    }
//
//    timeId = setInterval(showNext, interval);
//
//  });
//
//  window.addEventListener("resize", function () {
//
//    //重新计算高度
//    ul.style.height = imgs[0].offsetHeight + "px";
//    liWidth = banner.offsetWidth;
//
//    //重新把三个人的位置重新设置一下
//    //不需要过度效果
//    imgs[prev].style.transition = "none";
//    imgs[now].style.transition = "none";
//    //注意next不需要动画
//    imgs[next].style.transition = "none";
//
//    //改三个人的位置
//    imgs[prev].style.transform = "translateX(" + (-liWidth) + "px)";  //0
//    imgs[now].style.transform = "translateX(0px)";  //1
//    imgs[next].style.transform = "translateX(" + (liWidth) + "px)";//2
//  })
//
//});