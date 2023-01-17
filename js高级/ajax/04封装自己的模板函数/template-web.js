function template(id, data) {
  var str = document.getElementById(id).innerHTML;
  var reg = /{{\s*([a-zA-Z]+)\s*}}/;
  var result = null;
  while ((result = reg.exec(str))) {
    str = str.replace(result[0], data[result[1]]);
  }
  return str;
}
