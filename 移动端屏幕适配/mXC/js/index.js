window.onload = function(){
    // 轮播图特效
    var focus = document.querySelector('.focus');
    var swiperContainer = document.querySelector('.swiper-container');
    // 克隆第一个和最后一个li并上树
    var fristSwiper = swiperContainer.children[0].cloneNode(true);
    var lastSwiper = swiperContainer.children[swiperContainer.children.length-1].cloneNode(true);
    swiperContainer.appendChild(fristSwiper);
    swiperContainer.insertBefore(lastSwiper,swiperContainer.children[0])
    // 轮播图中所有li
    var swiperItem = document.querySelectorAll('.swiper-item');
    swiperContainer.style.width = swiperContainer.children.length*100 + '%';
    for(var i = 0;i<swiperItem.length;i++){
        swiperItem[i].style.width = 100/swiperItem.length + '%';
    }
    // 添加小圆点
    var swiperCircle = document.querySelector('.swiper-circle');
    var html = '';
    for(var i=0;i<swiperItem.length-2;i++){
        html += '<li></li>';
    }
    swiperCircle.innerHTML = html;
    // 当前处于第几张图片
    var index = 0;
    swiperCircle.children[index].className = 'current';
    // 自动轮播特效
    var timer = setInterval(function(){
        index++;
        swiperContainer.style.transition = 'transform .5s ease-out 0s';
        swiperContainer.style.transform = 'tranSlateX('+(-index)*swiperItem[0].offsetWidth+'px)'
    },1500)
    // 每次轮播结束后调整index，并为小圆点添加特效
    swiperContainer.addEventListener('transitionend',function(){
        if(index >= swiperItem.length-2){
            index = 0;
            swiperContainer.style.transition = 'none';
            swiperContainer.style.transform = 'tranSlateX('+(-index)*swiperItem[0].offsetWidth+'px)'
        }
        if(index <= -1){
            index = swiperItem.length-3;
            swiperContainer.style.transition = 'none';
            swiperContainer.style.transform = 'tranSlateX('+(-index)*swiperItem[0].offsetWidth+'px)'
        }
        swiperCircle.querySelector('li.current').classList.remove('current');
        swiperCircle.children[index].classList.add('current');
    })
    // 手指滑动特效
    // 手指初始位置和移动距离
    var moveStart = 0;
    var moveX = 0;
    focus.addEventListener('touchstart',function(e){
        clearInterval(timer);
        moveStart = e.targetTouches[0].pageX;
    })
    focus.addEventListener('touchmove',function(e){
        e.preventDefault();
        moveX = e.targetTouches[0].pageX - moveStart;
        swiperContainer.style.transition = 'none';
        swiperContainer.style.transform = 'tranSlateX('+(-index*swiperItem[0].offsetWidth+moveX)+'px)'
    })
    focus.addEventListener('touchend',function(e){
        if(Math.abs(moveX)>swiperItem[0].offsetWidth*0.2){
            index = moveX>0?index-1:index+1;
        }
        swiperContainer.style.transition = 'transform .5s ease-out 0s';
        swiperContainer.style.transform = 'tranSlateX('+(-index)*swiperItem[0].offsetWidth+'px)'
        clearInterval(timer);
        timer = setInterval(function(){
            index++;
            swiperContainer.style.transition = 'transform .5s ease-out 0s';
            swiperContainer.style.transform = 'tranSlateX('+(-index)*swiperItem[0].offsetWidth+'px)'
        },1500)
    })

    // 返回顶部按钮特效
    var backtop = document.querySelector('.backtop');
    var mainNav =document.querySelector('.main_nav');
    // 页面滚动到主导航时返回顶部按钮显示，否则隐藏
    document.addEventListener('scroll',function(){
        if(window.pageYOffset >= mainNav.offsetTop){
            backtop.style.display = 'inline-block';
        }else{
            backtop.style.display = 'none';
        } 
    })
    // 点击backtop按钮返回顶部
    var timer;
    backtop.addEventListener('click',function(){
        var top = window.pageYOffset;
        clearInterval(timer);
        timer = setInterval(function() {
            top-=50;
            window.scroll(0,top);
            if(top<=0) clearInterval(timer);
        }, 25);
    })
}