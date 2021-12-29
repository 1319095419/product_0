window.onload = function () {
    // 产品预览图放大镜效果
    var preview = document.getElementById('preview_img');
    var mask = document.getElementById('mask');
    var big = document.getElementById('big');
    var bigImg = document.getElementById('big_img');
    // 鼠标进入图片区域显示遮挡层和细节图
    preview.onmouseenter = function () {
        mask.style.display = 'block';
        big.style.display = 'block';
    }
    // 鼠标离开图片区域隐藏遮挡层和细节图
    preview.onmouseleave = function () {
        mask.style.display = 'none';
        big.style.display = 'none';
    }
    // 鼠标在图片中移动
    preview.onmousemove = function (e) {
        // 获取产品图片和遮罩层的宽度和高度
        var previewWidth = preview.offsetWidth;
        var previewHeight = preview.offsetHeight;
        var maskWidth = mask.offsetWidth;
        var maskHeight = mask.offsetHeight;
        // 获取产品图片到页面顶部和左边的距离
        var previewX = preview.offsetLeft;
        var previewY = preview.offsetTop;
        // 获取当鼠标移动时遮罩层在产品图片中的位置(鼠标要在遮罩层中间显示)
        var maskX = e.pageX - previewX - maskWidth / 2;
        var maskY = e.pageY - previewY - maskHeight / 2;
        // 获取遮罩层的最大移动距离
        var maskMaxX = previewWidth - maskWidth;
        var maskMaxY = previewHeight - maskHeight;
        // 遮罩层要在产品图片内部移动
        if (maskX < 0) {
            maskX = 0;
        } else if (maskX > maskMaxX) {
            maskX = maskMaxX;
        }
        if (maskY < 0) {
            maskY = 0;
        } else if (maskY > maskMaxY) {
            maskY = maskMaxY;
        }
        // 让遮罩层跟随鼠标移动
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        // 鼠标在产品图片中移动时让放大图中的图片跟着一起移动
        // 获取放大图图片的最大移动距离
        var bigMaxX = bigImg.offsetWidth - big.offsetWidth;
        var bigMaxY = bigImg.offsetHeight - big.offsetHeight;
        // 计算放大图图片的移动距离
        var bigX = bigMaxX * maskX / maskMaxX;
        var bigY = bigMaxY * maskY / maskMaxY;
        console.log(bigX, bigY);
        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';
    }

     // aside区域tab_list切换特效
     var tabList = document.getElementById('tab_list');
     var tabCon = document.getElementById('tab_con');
     var tabLis = tabList.querySelectorAll('li');
     var conLis = tabCon.querySelectorAll('li');
     // 为tab_list中的li绑定事件监听（事件委托方式）
     tabList.onclick = function(e){
         if(e.target.tagName.toLowerCase()=='li'){
            // 鼠标点击到li时添加样式，同时要提前删除掉其他li的样式
             for(var i=0;i<tabLis.length;i++){
                tabLis[i].className = '';
                tabLis[i].setAttribute('data-index',i);
             }
             e.target.className = 'current';

            //  tab_con切换到相应的内容区域
            var index = e.target.getAttribute('data-index');
            for(var i=0;i<conLis.length;i++){
                conLis[i].className = 'tab_item';
            }
            conLis[index].className = 'tab_item block';
         }
     }
}