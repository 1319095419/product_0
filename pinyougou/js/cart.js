$(function () {
    // 页面每次加载时计算购物车被选中商品的总数和总价
    getTotal()

    // 1.商品input框选定相关逻辑
    // 为全选input框添加事件监听
    $('.checkall').change(function () {
        // 获取到全选input框的选定状态,
        var state = $(this).prop('checked');
        // 让各商品的input框和两个全选input框的状态保持一致
        $('.j-checkbox,.checkall').prop('checked', state);
        // 先删除所有的样式，再为选中的商品添加背景样式
        // 另一种思路:通过.prop(checked)判断选中状态，根据选中状态添加和删除背景样式
        $('.cart-item').removeClass('check-cart-item');
        $('.j-checkbox:checked').parents('.cart-item').addClass('check-cart-item');
        // 计算购物车被选中商品的总数和总价
        getTotal()
    })
    // 为各商品input框添加事件监听
    $('.j-checkbox').change(function () {
        // 如果各商品input框全部选中，则让总选框也被选中，否则总选框不被选中
        if ($('.j-checkbox:checked').length === $('.j-checkbox').length) {
            $('.checkall').prop('checked', true);
        } else {
            $('.checkall').prop('checked', false);
        }
        // 先删除所有的样式，再为选中的商品添加背景样式
        $('.cart-item').removeClass('check-cart-item');
        $('.j-checkbox:checked').parents('.cart-item').addClass('check-cart-item');
        // 计算购物车被选中商品的总数和总价
        getTotal()
    })
    // 2.商品数量加减相关逻辑
    // 商品数量加号事件监听
    $('.increment').click(function () {
        // 点击加号时商品数量加1
        var num = Number($(this).siblings('.itxt').val());
        num++;
        $(this).siblings('.itxt').val(num);
        // 计算小计价格
        var price = parseFloat($(this).parents('.p-num').siblings('.p-price').text().substr(1));
        $(this).parents('.p-num').siblings('.p-sum').text('￥' + (price * num).toFixed(2));
        // 计算购物车被选中商品的总数和总价
        getTotal()
    })
    // 商品数量减号事件监听
    $('.decrement').click(function () {
        // 点击加号时商品数量减1，最小为1
        var num = Number($(this).siblings('.itxt').val());
        if (num === 1) return false;
        num--;
        $(this).siblings('.itxt').val(num);
        // 计算小计价格
        var price = parseFloat($(this).parents('.p-num').siblings('.p-price').text().substr(1));
        price = price.toFixed(2);
        $(this).parents('.p-num').siblings('.p-sum').text('￥' + (price * num).toFixed(2));
        // 计算购物车被选中商品的总数和总价
        getTotal()
    })
    // 3.商品删除相关逻辑
    // 删除单个商品
    $('.p-action a').click(function () {
        $(this).parents('.cart-item').remove();
        getTotal()
    })
    // 删除选中的商品
    $('.remove-batch').click(function () {
        $('.j-checkbox:checked').parents('.cart-item').remove();
        getTotal()
    })
    // 清空购物车
    $('.clear-all').click(function () {
        $('.j-checkbox').parents('.cart-item').remove();
        getTotal()
    })
    // 计算购物车被选中商品的总数和总价
    function getTotal() {
        // 获取到input框选中的商品对应的数量元素
        var checkedItxts = $('.j-checkbox:checked').parent().siblings('.p-num').find('.itxt');
        var totalNum = 0;
        var totalPrice = 0;
        $.each(checkedItxts, function (index, domEl) {
            totalNum += parseFloat($(domEl).val());
            totalPrice += parseFloat($(domEl).parents('.p-num').siblings('.p-sum').text().substr(1));
        })
        $('.amount-sum em').text(totalNum);
        $('.price-sum em').text('￥' + totalPrice.toFixed(2));
    }
})