window.onload = function () {
    // 首页focus区域轮播图特效
    // 获取舞台盒子
    var focusLeft = document.querySelector('.focus_left');
    // 获取ul
    var focusContainer = document.querySelector('.focus_container');
    // 克隆第一张图片并上树
    var firstLi = focusContainer.children[0].cloneNode(true);
    focusContainer.appendChild(firstLi);
    // 获取li，并为ul设置宽度
    var lis = focusContainer.querySelectorAll('li');
    focusContainer.style.width = lis.length * 100 + '%';
    for(var i=0;i<lis.length;i++){
        lis[i].style.width = 100/lis.length + '%';
    }
    // 小圆点
    var circle = document.querySelector('.circle');
    var circleLi = '';
    for (var i = 0; i < lis.length - 1; i++) {
        circleLi += '<li></li>';
    }
    circle.innerHTML = circleLi;
    var circleLis = circle.querySelectorAll('li');
    circleLis[0].className = 'current';
    for (var i = 0; i < circleLis.length; i++) {
        circleLis[i].setAttribute('data-index', i);
    }
    // 左右按钮
    var prev = document.querySelector('.prev_btn');
    var next = document.querySelector('.next_btn');
    // 当前处于第几张图片
    var index = 0;
    // 节流锁
    var lock = true;
    // 右按钮事件监听
    next.addEventListener('click',nextAnimation)
    function nextAnimation () {
        if (!lock) return;
        lock = false;
        index++;
        focusContainer.style.transition = 'left .5s ease-out 0s';
        focusContainer.style.left = -index * firstLi.offsetWidth + 'px';
        if (index === lis.length-1) {
            index = 0;
            setTimeout(function () {
                focusContainer.style.transition = 'none';
                focusContainer.style.left = -index * firstLi.offsetWidth + 'px';
            }, 500)
        }
        for (var i = 0; i < circleLis.length; i++) {
            circleLis[i].className = '';
            circleLis[i].setAttribute('data-index', i);
        }
        circleLis[index].className = 'current';
        setTimeout(function () {
            lock = true;
        },500)
    }
    // 左按钮事件监听
    prev.addEventListener('click', function () {
        if (!lock) return;
        lock = false;
        if (index === 0) {
            index = lis.length-1;
            focusContainer.style.transition = 'none';
            focusContainer.style.left = -index * firstLi.offsetWidth + 'px';
        }
        index--;
        setTimeout(function () {
            focusContainer.style.transition = 'left .5s ease-out 0s';
            focusContainer.style.left = -index * firstLi.offsetWidth + 'px';
        }, 0)
        for (var i = 0; i < circleLis.length; i++) {
            circleLis[i].className = '';
        }
        circleLis[index].className = 'current';
        setTimeout(function () {
            lock = true;
        },500)
    })
    // 小圆点事件监听
    circle.onclick = function (e) {
        if (e.target.tagName.toLowerCase() === 'li') {
            if(!lock) return;
            lock = false;
            var circleIndex = e.target.getAttribute('data-index');
            for (var i = 0; i < circleLis.length; i++) {
                circleLis[i].className = '';
            }
            circleLis[circleIndex].className = 'current';
            index = circleIndex;
            focusContainer.style.transition = 'left .5s ease-out 0s';
            focusContainer.style.left = -index * firstLi.offsetWidth + 'px';
            setTimeout(function () {
                lock = true;
            },500)
        }
    }
    // 自动轮播特效
    var timer = setInterval(nextAnimation,1500);
    // 鼠标进入舞台盒子后自动轮播停止
    focusLeft.onmouseenter = function(){
        clearInterval(timer);
    }
    // 鼠标离开舞台盒子自动轮播开始
    focusLeft.onmouseleave = function(){
        clearInterval(timer);
        timer = setInterval(nextAnimation,1500);
    }
}

// 楼层导航代码逻辑，使用jQuery来写
$(function(){
    // 节流阀，触发楼层导航点击事件时页面滚动事件中的代码不能执行
    var lock = true;
    // 每次页面刷新都要执行
    fadeInOrOut();
    // 页面滚动事件
    $(window).scroll(function(){
        //1.控制楼层导航栏的显示和隐藏
        fadeInOrOut();

        // 当节流阀关闭时，下面代码不执行
        if(!lock) return false;
        // 3.滚动到某个楼层时得到所在楼层的索引值，为对应的楼层导航添加样式
        $('.floor>div').each(function(index,domEl){
            if($(document).scrollTop() >= $(domEl).offset().top){
                // 有多个index不用怕，后面的代码会覆盖掉前面的代码
                $('.fixedtool li').eq(index).addClass('current').siblings('li').removeClass('current');
            }
        })
    })
    // 2.楼层导航点击事件
    $('.fixedtool li').click(function(){
        // 触发点击事件后关闭节流阀
        lock = false;
        // 为选中的元素添加样式，其余元素删除样式
        $(this).addClass('current').siblings('li').removeClass('current');
        // 获取到选中元素的索引值，让页面滚动到和索引值相对应的楼层中
        var index = $(this).index();
        $('html,body').stop().animate({
            scrollTop:$('.floor>div').eq(index).offset().top
        },function(){
            // 滚动动画结束后打开节流阀
            lock = true;
        })
    })

    // 控制楼层导航栏的显示和隐藏
    function fadeInOrOut(){
        if($(document).scrollTop()>=$('.recommend').offset().top){
            $('.fixedtool').fadeIn();
        }else{
            $('.fixedtool').fadeOut();
        }
    }
})