window.onload = function () {
  //验证手机号码
  var tel =
    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
  //登录密码验证
  var pwd = /^[a-zA-Z]\w{5,17}$/;
  var phone = document.querySelector("#tel");
  var password = document.querySelector("#pwd");
  var repwd = document.querySelector("#repwd");
  reg(phone, tel);
  reg(password, pwd);
  function reg(el, reg) {
    el.onblur = function () {
      if (reg.test(this.value)) {
        this.nextElementSibling.className = "success";
        this.nextElementSibling.innerHTML =
          '<i class="success_icon"></i> 恭喜您输入正确';
      } else {
        this.nextElementSibling.className = "error";
        this.nextElementSibling.innerHTML =
          '<i class="error_icon"></i> 格式不正确，请从新输入 ';
      }
    };
  }
  repwd.onblur = function () {
    if (this.value == password.value) {
      this.nextElementSibling.className = "success";
      this.nextElementSibling.innerHTML =
        '<i class="success_icon"></i> 恭喜您输入正确';
    } else {
      this.nextElementSibling.className = "error";
      this.nextElementSibling.innerHTML =
        '<i class="error_icon"></i> 两次密码输入不一致';
    }
  };
};
