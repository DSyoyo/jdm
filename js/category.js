/**
 * Created by 90380 on 2018/5/31.
 */


//左边nav跟着ul向上移动，注册手机屏幕触摸事件

//;(function () {
//  var ul = document.querySelector(".jd_content .nav ul");
//  var nav = document.querySelector(".jd_content .nav");
//  //设置开始的位置
//  var startY = 0;
//  //记录每次滑动结束后的距离
//  var currentY = 0;
//
//  ul.addEventListener("touchstart", function (e) {
//    startY = e.touches[0].clientY;
//  })
//
//  //要获取到触摸的距离，让ul跟着移动
//  ul.addEventListener("touchmove", function (e) {
//    var distance = e.touches[0].clientY - startY;
//
//
//    //清除过渡
//    removeTransition();
//    在移动后的基础上再次移动
//    addTranslateY(currentY+ distance);
//  })
//
//  //记录下来每次滑动距离。
//  ul.addEventListener("touchend", function (e) {
//
//    var distance = e.changedTouches[0].clientY - startY;
//
//    //每次都把滑动的距离加到currentY中
//     currentY +=distance;
//    //判断currentY是否大于0.若大于0，添加过渡
//    if (currentY > 0) {
//      currentY = 0;
//    }
//    console.log(nav.offsetHeight , ul.offsetHeight);
//    if (currentY < nav.offsetHeight - ul.offsetHeight) {
//      currentY = nav.offsetHeight - ul.offsetHeight;
//    }
//
//    addTransition();
//    addTranslateY(currentY);
//  })
//
//
//  //封装添加动画函数
//  function addTransition() {
//    ul.style.transition = "all .2s";
//    ul.style.webkitTransition = "all .2s";
//  }
//
//  //封装移除动画函数
//  function removeTransition() {
//    ul.style.transition = "none";
//    ul.style.webkitTransition = "none";
//  }
//
//  //封装添加translateX值
//  function addTranslateY(value) {
//    ul.style.transform = "translateY(" + value + "px)";
//    ul.style.webkitTransform = "translateY(" + value + "px)";
//  }
//
//})();

;(function () {
  window.addEventListener("load",function () {
    new IScroll(".nav",{
      scrollY:true,
      scrollX:false
    })

    new IScroll(".product");
  })

})();

