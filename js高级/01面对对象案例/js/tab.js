class Tab {
  constructor(id) {
    this.main = document.querySelector(id);
    this.add = this.main.querySelector(".tabadd");
    this.ul = this.main.querySelector(".fisrstnav ul:first-child");
    this.content = this.main.querySelector(".tabscon");
    this.init();
  }
  //   初始化绑定事件
  init() {
    this.upLoad();
    for (var i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i;
      this.lis[i].addEventListener(
        "click",
        this.toggleTab.bind(this.lis[i], this)
      );
      this.close[i].addEventListener(
        "click",
        this.removeTab.bind(this.close[i], this)
      );
      this.spans[i].addEventListener("dblclick", this.editTab);
      this.sections[i].addEventListener("dblclick", this.editTab);
    }
    this.add.addEventListener("click", this.addTab.bind(this.add, this));
  }
  //更新节点功能   由于构造函数只调用一次，所以新增的节点无法点击实现切换功能
  upLoad() {
    this.lis = this.main.querySelectorAll("li");
    this.sections = this.main.querySelectorAll("section");
    this.close = this.main.querySelectorAll(".icon-guanbi");
    this.spans = this.main.querySelectorAll(".fisrstnav li span:first-child");
  }
  //1.切换功能
  toggleTab(that) {
    for (var i = 0; i < that.sections.length; i++) {
      that.sections[i].className = "";
      that.lis[i].className = "";
    }
    this.className = "liactive";
    that.sections[this.index].className = "conactive";
  }

  //2.添加功能
  addTab(that) {
    var random = Math.random();
    //*第一种方法通过appendChild追加到末尾
    /*  var li = document.createElement("li");
    that.lis[0].parentNode.appendChild(li);
    li.innerHTML =
      '<span>测试</span><span class="iconfont icon-guanbi"></span>';
    var section = document.createElement("section");
    that.sections[0].parentNode.appendChild(section);
    section.innerHTML = "测试" + radom; */
    //*第二种方法，通过insertAdjacentHTML()添加字符串进行添加
    //  todo默认选中新建栏，先清除样式
    for (var i = 0; i < that.sections.length; i++) {
      that.sections[i].className = "";
      that.lis[i].className = "";
    }
    var li =
      '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
    var section = '<section class="conactive">测试 ' + random + "</section>";
    that.ul.insertAdjacentHTML("beforeend", li);
    that.content.insertAdjacentHTML("beforeend", section);
    that.init();
  }
  //3.删除功能
  removeTab(that, e) {
    //  todo 防止冒泡，点击删除时触发li的切换功能
    e.stopPropagation();
    that.ul.removeChild(that.lis[this.parentNode.index]);
    that.content.removeChild(that.sections[this.parentNode.index]);
    // ?这里的重新绑定事件，其实不需要，因为是删除，剩下的都有绑定点击事件
    that.init();
    //  todo若删除的时选中的，则默认选中上一个
    if (this.parentNode.className == "liactive") {
      that.lis[this.parentNode.index - 1].className = "liactive";
      that.sections[this.parentNode.index - 1].className = "conactive";
    }
  }
  //4.修改功能
  editTab() {
    var str = this.innerHTML;
    //  todo双击禁止选中文字
    window.getSelection
      ? window.getSelection().removeAllRanges()
      : document.selection.empty();
    this.innerHTML = '<input type="text"/>';
    var input = this.children[0];
    input.value = str;
    input.select();
    //  todo当我们离开文本框就把文本框里面的值给span
    input.onblur = function () {
      this.parentNode.innerHTML = this.value;
    };
    //  todo按下回车也可以把文本框里面的值给span
    input.onkeyup = function (e) {
      if (e.keyCode === 13) {
        // ?手动调用表单失去焦点事件  不需要鼠标离开操作
        this.blur();
      }
    };
  }
}
new Tab("#tab");
