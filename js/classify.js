/**
 * Created by 90380 on 2018/5/31.
 */


//;(function () {
//  //若有图片，需要注册window.onload事件，加载完图片才执行
//  window.addEventListener("load",function () {
//    new IScroll(".nav",{
//      scrollY :true,  //允许垂直滚动
//      scrollX:false  //禁止水平滚动
//    })
//    new IScroll(".product");
//
//  })
//
//})();


;(function () {
  var nav = document.querySelector(".jd_content .nav");
  var ul = document.querySelector(".nav ul");

  var startY = 0;
  var currentY = 0;
  ul.addEventListener("touchstart", function (e) {
    startY = e.touches[0].clientY;
  })

  ul.addEventListener("touchmove", function (e) {
    var distance = e.touches[0].clientY - startY;
    removeTransition();
    setTransform(currentY + distance);
  })

  ul.addEventListener("touchend", function (e) {
    var distance = e.changedTouches[0].clientY - startY;

    currentY += distance;

    if (currentY > 0) {
      currentY = 0;
    }
    if (currentY < nav.offsetHeight - ul.offsetHeight) {
      currentY = nav.offsetHeight - ul.offsetHeight;
    }

    addTransition();

    setTransform(currentY);
  })


  function addTransition() {
    ul.style.transition = "all .2s";
    ul.style.webkitTransition = "all .2s";
  }

  function removeTransition() {
    ul.style.transition = "none";
    ul.style.webkitTransition = "none";
  }

  function setTransform(value) {
    ul.style.transform = "translateY(" + value + "px)";
    ul.style.webkitTransform = "translateY(" + value + "px)";
  }
})();


;(function () {
  var product = document.querySelector(".jd_content .product");
  var wrapper = document.querySelector(".product .wrapper");

  //设置开始的位置
  var startY = 0;
  //记录每次滑动结束后的距离
  var currentY = 0;
  wrapper.addEventListener("touchstart", function (e) {
    startY = e.touches[0].clientY;
  })

  //要获取到触摸的距离，让ul跟着移动
  wrapper.addEventListener("touchmove", function (e) {
    var distance = e.touches[0].clientY - startY;

    //清除过渡
    removeTransition();
    setTransform(distance + currentY);
  })

  //记录下来每次滑动距离。
  wrapper.addEventListener("touchend", function (e) {
    var distance = e.changedTouches[0].clientY - startY;
    currentY += distance;

    if (currentY > 0) {
      currentY = 0;
    }
    if (currentY < product.offsetHeight - wrapper.offsetHeight) {
      currentY = product.offsetHeight - wrapper.offsetHeight;
    }

    addTransition();
    setTransform(currentY);
    console.log(currentY);
  })


  function addTransition() {
    wrapper.style.transition = "all .2s";
    wrapper.style.webkitTransition = "all .2s";
  }

  function removeTransition() {
    wrapper.style.transition = "none";
    wrapper.style.webkitTransition = "none";
  }

  function setTransform(value) {
    wrapper.style.transform = "translateY(" + value + "px)";
    wrapper.style.webkitTransform = "translateY(" + value + "px)";
  }
})();