window.onload = function () {
  //1、获取数据
  function getNews() {
    $.get("http://www.liulongbin.top:3006/api/news", function (res) {
      if (res.status !== 200) {
        return alert("获取新闻列表失败！");
      } else {
        //3、调用模板函数
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].tags = res.data[i].tags.split(",");
        }
        console.log(res);
        var htmlStr = template("tpl-news", res);
        var list = document.querySelector("#news-list");
        list.innerHTML = htmlStr;
      }
    });
  }
  //时间过滤器
  template.defaults.imports.getTime = function (date) {
    var dt = new Date(date);
    var y = dt.getFullYear();
    var m = dt.getMonth() + 1;
    var d = dt.getDate();
    var h = dt.getHours();
    h = h > 10 ? h : "0" + h;
    var mm = dt.getMinutes();
    mm = mm > 10 ? mm : "0" + mm;
    var s = dt.getSeconds();
    s = s > 10 ? s : "0" + s;
    return y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s;
  };
  getNews();
};
