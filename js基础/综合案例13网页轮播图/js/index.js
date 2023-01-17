// 鼠标经过轮播图显示左右按钮
window.addEventListener("load", function () {
  var btn1 = document.querySelector(".arrow_l");
  var btn2 = document.querySelector(".arrow_r");
  var box = document.querySelector(".focus");
  box.addEventListener("mouseenter", function () {
    btn1.style.display = "block";
    btn2.style.display = "block";
    //停止自动播放计时器
    clearInterval(timer);
  });
  box.addEventListener("mouseleave", function () {
    btn1.style.display = "none";
    btn2.style.display = "none";
    timer = setInterval(function () {
      //自动点击触发右侧按钮点击事件
      btn2.click();
    }, 2000);
  });
  //动态创建下方圆圈数
  var box1 = box.querySelector("ul");
  var imgs = box1.children;
  var lis = box.querySelector(".circle");
  for (var i = 0; i < imgs.length; i++) {
    var li = document.createElement("li");
    lis.appendChild(li);
    //利用自定义属性创建当前元素的索引号
    li.setAttribute("index", i);
  }
  //点击实现背景色跳转，并且图片轮播
  for (var j = 0; j < lis.children.length; j++) {
    lis.children[j].addEventListener("click", function () {
      var index = this.getAttribute("index");
      //获取索引号，当点击完下方索引后，点击两侧按钮，能够正常显示下一张
      num = index;
      circle = index;
      //排他思想
      for (var i = 0; i < lis.children.length; i++) {
        lis.children[i].className = "";
      }
      this.className = "current";
      var imgWidth = box.offsetWidth;
      //是对ul盒子进行动画操作，目标位置等于索引号乘动画盒子的大小
      animate(box1, -index * imgWidth);
    });
  }
  lis.children[0].className = "current";
  //点击右侧按钮实现切换轮播图
  var num = 0;
  //控制下方圆圈变化
  var circle = 0;
  //复制到一个图片到ul末尾
  //节流阀
  var flag = true;
  var lastli = box1.children[0].cloneNode(true);
  box1.appendChild(lastli);
  btn2.addEventListener("click", function () {
    if (flag) {
      flag = false;
      if (num == 4) {
        num = 0;
        box1.style.left = "0";
      }
      num++;
      animate(box1, -num * box.offsetWidth, function () {
        flag = true;
      });
      //让小圆圈跟着轮播图变化
      circle++;
      circle = circle == lis.children.length ? 0 : circle;
      circleChange();
    }
  });
  //点击左侧按钮实现切换轮播图
  btn1.addEventListener("click", function () {
    if (flag) {
      flag = false;
      if (num == 0) {
        num = box1.children.length - 1;
        box1.style.left = -num * box.offsetWidth + "px";
      }
      num--;
      animate(box1, -num * box.offsetWidth, function () {
        flag = true;
      });
      //让小圆圈跟着轮播图变化
      circle--;
      circle = circle == -1 ? lis.children.length - 1 : circle;
      circleChange();
    }
  });
  //优化：将下方按钮变化封装为一个函数
  function circleChange() {
    for (var i = 0; i < lis.children.length; i++) {
      lis.children[i].className = "";
    }
    lis.children[circle].className = "current";
  }
  //自动播放
  var timer = setInterval(function () {
    //自动点击触发右侧按钮点击事件
    btn2.click();
  }, 2000);
});
