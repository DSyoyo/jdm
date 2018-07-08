/**
 * Created by 90380 on 2018/5/28.
 */






//功能1  header根据scrollTop值改变背景色
;(function () {
  var header = document.querySelector(".jd_header");
  //给window注册滚动事件
  window.addEventListener("scroll", function () {
    //header开始透明度为0
    var opacity = 0;
    //滚动条滚动的距离
    var scrollTop = window.pageYOffset;
    //假设scrollTop为500，透明度为0.9，大于500，等于0.9
    if (opacity <= 500) {
      opacity = scrollTop / 500 * 0.9;
    } else {
      opacity = 0.9;
    }
    header.style.backgroundColor = "rgba(222, 24, 27, " + opacity + ")";
  })

})();

//功能2，秒杀倒计时
;(function () {
  //找到所有的奇数span
  var spans = document.querySelectorAll(".seckill_time span:nth-child(odd)");
  //一打开页面，先调用一次时间
  setTime();
  function setTime() {
    //当前的时间，由于手机端的safari不能识别时间“—”,所以改为逗号隔开
    //var nowTime = new Date(2018, 4, 30, 13, 0, 6);
    var nowTime = new Date();
    //倒计时事件
    var secTime = new Date(2018, 4, 31, 12, 0, 0);
    var total = parseInt((secTime - nowTime) / 1000);

    //判断如果时间小于等于0，就清除定时器，并且让时间等于0
    if (total <= 0) {
      total = 0;
      clearInterval(timeId);
    }
    var hours = parseInt(total / 60 / 60);
    //console.log(hours);
    var minutes = parseInt(total / 60 % 60);
    //console.log(minutes);
    var seconds = parseInt(total % 60);
    //console.log(seconds);

    spans[0].innerText = addZero(hours);
    spans[1].innerText = addZero(minutes);
    spans[2].innerText = addZero(seconds);

    //判断时间小于0，在前面加0，
    function addZero(n) {
      return n < 10 ? "0" + n : n;
    }
  }

  //开启定时器
  var timeId = setInterval(setTime, 1000);

})();

//功能3：动态计算秒杀商品的ul的宽度

;(function () {
  var lis = document.querySelectorAll(".seckill_content li");
  var ul = document.querySelector(".seckill_content");

  ul.style.width = lis[0] * lis.length + "px";
})();


//功能4：京东快报
;(function () {
  var ul = document.querySelector(".jd_news .news ul");
  var lis = ul.querySelectorAll("li");
  //count记录li显示到第几个
  var count = 0;
  var liHeight = lis[0].offsetHeight;
  setInterval(function () {
    count++;
    //动画过渡时间
    ul.style.transition = "all .5s";
    //为了兼容性，需写两个，一个加webkit前缀
    ul.style.webkitTransition = "all .5s";

    ul.style.transform = "translateY(-" + count * liHeight + "px)";
    ul.style.webkitTransform = "translateY(-" + count * liHeight + "px)";
  }, 1000);

  //给ul注册过渡结束事件
  ul.addEventListener("transitionend", function () {
    //判断，如果是最后一个li，就让显示第一个li
    if (count >= lis.length - 1) {
      count = 0;
      //需把以下内容写在判断句里面，谨记----------------------------------
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
  var ul = banner.querySelector("ul");
  var imgs = ul.querySelectorAll("li");
  var ol = banner.querySelector("ol");
  var points = ol.querySelectorAll("li");

  //------由于前面加了一张假图片，所以count要从1开始-----
  var count = 1;
  var liWidth = banner.offsetWidth;
  var interval = 1000;

  //开始定时器
  var timeId = setInterval(function () {
    count++;
    //ul.style.transition = "all .5s";
    //ul.style.webkitTransition = "all .5s";
    addTransition();

    //ul.style.transform = "translateX(-" + count * liWidth + "px)";
    //ul.style.webkitTransform = "translateX(-" + count * liWidth + "px)";
    addTranslateX(-count * liWidth);

  }, interval)

  //给ul注册事件结束事件
  ul.addEventListener("transitionend", function () {
    //判断图片是最后一张，瞬间变回第一张
    if (count >= imgs.length - 1) {
      count = 1;
      //ul.style.transition = "none";
      //ul.style.webkitTransition = "none";
      removeTransition();

      //ul.style.transform = "translateX(-" + count * liWidth + "px)";
      //ul.style.webkitTransform = "translateX(-" + count * liWidth + "px)";
      addTranslateX(-count * liWidth);
    }
    //判断如果是第0张，瞬间变回倒数第二张
    if (count <= 0) {
      count = imgs.length - 2;
    }

    //过渡事件结束后，小圆点动
    points.forEach(function (e) {
      e.classList.remove("now");
    })
    points[count - 1].classList.add("now");
  });


//给ul注册3个touch事件
  
  var startX = 0;
  var startTime = 0;
  //1.给ul注册触摸开始事件
  ul.addEventListener("touchstart", function (e) {
    //清理定时器
    clearInterval(timeId);
    //记录下开始的位置
    startX = e.touches[0].clientX;
    startTime = new Date();
    
  })
  
  //2.给ul注册触摸移动事件
  ul.addEventListener("touchmove", function (e) {
    //获取触摸时移动的距离
    var distance = e.touches[0].clientX - startX;
    //移除过渡事件
    removeTransition();
    // 让ul在原来的基础上移动
    addTranslateX(-count * liWidth + distance);

  })
  
  
  //3.给ul注册离开事件
  //支持快速滑动，  如果持续时间<200ms,只需要滑动距离超过50px就算滑动成功
  
  ul.addEventListener("touchend", function (e) {

    //01获取到结束时的位置，计算最终移动的距离，根据距离进行判断。
    var distance = e.changedTouches[0].clientX - startX;
    var duration = new Date()-startTime;

    //02判断移动距离是否超过1/3屏，判断上一屏还是下一屏，或者是吸附
    if (distance >= liWidth / 3 || (duration >= 200 && distance >= 50)) {
      count--;
    }
    if (distance <= -liWidth / 3 || (duration >= 200 && distance <= -50)) {
      count++;
    }
    //03添加过渡
    addTransition();
    //04执行动画
    addTranslateX(-count * liWidth);
    //05重新开启定时器

    timeId = setInterval(function () {
      count++;
      addTransition();
      addTranslateX(-count * liWidth);
    }, interval)

  })

  //给window注册resieze事件，动态的修改的liWidth的值
  window.addEventListener("resize",function () {
    liWidth = banner.offsetWidth;
    addTranslateX(-count*liWidth);

  })
//封装添加动画函数
  function addTransition() {
    ul.style.transition = "all .2s";
    ul.style.webkitTransition = "all .2s";
  }

  //封装移除动画函数
  function removeTransition() {
    ul.style.transition = "none";
    ul.style.webkitTransition = "none";
  }

  //封装添加translateX值
  function addTranslateX(value) {
    ul.style.transform = "translateX(" + value + "px)";
    ul.style.webkitTransform = "translateX(" + value + "px)";
  }


})();