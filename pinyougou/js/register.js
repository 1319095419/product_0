(function () {
    // 获取输入框元素节点
    var tel = document.querySelector('#tel');
    var message = document.querySelector('#message');
    var psd = document.querySelector('#psd');
    var psd2 = document.querySelector('#psd2');
    var telReg = /^1[3|4|5|7|8]\d{9}$/;
    var messageReg = /^\d{6}$/;
    var psdReg = /^[a-zA-Z0-9_-]{6,12}$/;
    // 手机号判断
    regExp(tel,telReg);
    // 验证码格式判断
    regExp(message,messageReg);
    // 密码格式判断
    regExp(psd,psdReg);
    // 正则判断函数
    function regExp(elem,reg){
        elem.addEventListener('blur', function () {
            if (reg.test(this.value)) {
                this.nextElementSibling.className = 'success';
                this.nextElementSibling.innerHTML = '输入格式正确';
    
            } else {
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '输入格式不正确，请重新输入';
            }
        })
    }
    // 二次密码输入判断
    psd2.addEventListener('blur',function(){
        if (this.value === psd.value) {
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = '输入正确';

        } else {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '两次输入不一致，请重新输入';
        }
    })
}())