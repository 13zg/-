//将数据对象转换为查询字符串
function resetStr(data) {
  var arr = [];
  for (var k in data) {
    var str = k + "=" + data[k];
    arr.push(str);
  }
  return arr.join("&");
}
//封装ajax函数
function myajax(option) {
  var xhr = new XMLHttpRequest();
  qs = resetStr(option.data);
  if (option.type.toUpperCase() === "GET") {
    xhr.open("GET", option.url + "?" + qs);
    xhr.send();
  } else if (option.type.toUpperCase() === "POST") {
    xhr.open("POST", option.url);
    xhr.setRequestHeader("content-Type", "application/x-www-form-urlencoded");
    xhr.send(qs);
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      option.success(JSON.parse(xhr.responseText));
    }
  };
}
