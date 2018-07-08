/**
 * Created by 90380 on 2018/6/5.
 */

;(function () {
  var all = document.querySelectorAll(".jd_checkbox");
  all.forEach(function (element) {
    console.log(element);
    //先给所有的jd_checkbox注册点击事件，切换选中与不选中
    element.addEventListener("click", function () {
      this.classList.toggle("checked");
    })
  });


  var titles = document.querySelectorAll(".jd_title .jd_checkbox");

  //给多个title里的jd_checkbox注册点击事件，遍历
  titles.forEach(function (e) {
    e.addEventListener("click", function () {

      var elems = this.parentNode.nextElementSibling.querySelectorAll(".jd_checkbox");
      var isChecked = this.classList.contains("checked");
      //遍历所有content内的jd_checkbox,判断如果头部选中，则选中
      elems.forEach(function (element) {
        if (isChecked) {
          element.classList.add("checked");
        } else {
          element.classList.remove("checked");
        }
      })

    })

  })

})();

;(function () {
  var deleteBoxes = document.querySelectorAll(".delete_box");

  var mask = document.querySelector(".jd_mask");

  var cover;
  var cancel = document.querySelector(".cancel");
  deleteBoxes.forEach(function (element) {
    element.addEventListener("click", function () {
      cover = this.firstElementChild;
      cover.style.transform = "rotate(30deg)";
      cover.style.transition = "all .5s";
      cover.style.transformOrigin = "right bottom";

      mask.style.display = "block";
    })

  })

  cancel.addEventListener("click", function () {

    cover.style.transform = "rotate(0deg)";
    cover.style.transition = "none";
    mask.style.display = "none";

  })

})();