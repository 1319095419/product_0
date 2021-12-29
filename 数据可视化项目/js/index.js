// 监控区域切换逻辑
+function () {
    // tab栏切换
    $('.monitor .content').eq(0).show().siblings('.content').hide();
    $('.monitor .tabs').on('click', 'a', function () {
        // 给自己添加样式，去除其他兄弟元素的样式
        $(this).addClass('active').siblings().removeClass('active');
        // 点击项目对应的内容展示，其他兄弟内容隐藏
        $('.monitor .content').eq($(this).index()).show().siblings('.content').hide();
        // 让content列表重新开始滚动
        top = 0;
        $('.marquee-view .marquee').css('transform', `translate(0,${-top}%)`);
    })
    // content列表滚动
    // 先复制一份列表中的内容
    var top = 0;
    $('.marquee-view .marquee').each(function () {
        var rows = $(this).children().clone();
        $(this).append(rows);
    })
    var timer = setInterval(function () {
        if (top >= 50) {
            top = 0;
            $('.marquee-view .marquee').css('transform', `translate(0,${-top}%)`);
        }
        top += 0.2;
        $('.marquee-view .marquee').css('transform', `translate(0,${-top}%)`);
    }, 50)
    $('.marquee-view').hover(function () {
        clearInterval(timer);
    }, function () {
        clearInterval(timer);
        timer = setInterval(function () {
            if (top >= 50) {
                top = 0;
                $('.marquee-view .marquee').css('transform', `translate(0,${-top}%)`);
            }
            top += 0.2;
            $('.marquee-view .marquee').css('transform', `translate(0,${-top}%)`);
        }, 50)
    })
}()

    // 点位分布统计饼图
    + function () {
        var pieBox = document.querySelector('.pie');
        var myChart = echarts.init(pieBox);
        var option = {
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            colorBy: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
            series: [
                {
                    name: '点位统计',
                    type: 'pie',
                    radius: ['10%', '70%'],
                    center: ['50%', '50%'],
                    roseType: "radius",
                    label: {
                        fontSize: 10,
                    },
                    labelLine: {
                        // 连接到图形的线长度
                        length: 6,
                        // 连接到文字的线长度
                        length2: 8
                    },
                    data: [
                        { value: 20, name: '云南' },
                        { value: 26, name: '北京' },
                        { value: 24, name: '山东' },
                        { value: 25, name: '河北' },
                        { value: 20, name: '江苏' },
                        { value: 25, name: '浙江' },
                        { value: 30, name: '四川' },
                        { value: 42, name: '湖北' }
                    ]
                }
            ],
        };
        myChart.setOption(option);
        window.addEventListener('resize', function () {
            myChart.resize();
        })
    }()

    // 柱形图
    + function () {
        var barBox = document.querySelector('.bar');
        var myChart = echarts.init(barBox);
        // 中间省略的数据  准备三项
        var item = {
            name: '',
            value: '1200',
            // 柱子颜色
            itemStyle: {
                color: '#254065'
            },
            // 鼠标经过柱子颜色
            emphasis: {
                itemStyle: {
                    color: '#254065'
                }
            },
            // 工具提示隐藏
            tooltip: {
                extraCssText: 'opacity:0'
            },
        }
        var option = {
            tooltip: {
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                show: true,
                borderColor: 'rgba(0, 240, 255, 0.3)',
                top: '2%',
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(0, 240, 255, 0.3)',
                        }
                    },
                    axisLabel: {
                        color: '#4c9bfd'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        color: '#4c9bfd'
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(0, 240, 255, 0.3)',
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(0, 240, 255, 0.3)'
                        }
                    }
                }
            ],
            series: [
                {
                    name: '直接访问',
                    type: 'bar',
                    barWidth: '60%',
                    data: [2100, 1900, 1700, 1560, 1400, item, item, item, 900, 750, 600, 480, 240],
                    color: new echarts.graphic.LinearGradient(
                        // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                        0, 0, 0, 1,
                        [
                            { offset: 0, color: '#00fffb' }, // 0 起始颜色
                            { offset: 1, color: '#0061ce' }  // 1 结束颜色
                        ]
                    ),
                }
            ]
        };

        myChart.setOption(option);
        window.addEventListener('resize', function () {
            myChart.resize();
        })
    }()

    // 订单功能
    + function () {
        var data = {
            day365: { orders: '20,301,987', amount: '99834' },
            day90: { orders: '301,987', amount: '9834' },
            day30: { orders: '1,987', amount: '3834' },
            day1: { orders: '987', amount: '834' }
        };
        var html = '';
        $.each(data, function (key, value,) {
            html += `<div class="data">
        <div class="item">
            <h4>${value.orders}</h4>
            <span>
                <i class="icon-dot" style="color: #ed3f35;"></i>
                订单量
            </span>
        </div>
        <div class="item">
            <h4>${value.amount}</h4>
            <span>
                <i class="icon-dot" style="color: #eacf19;"></i>
                销售额(万元)
            </span>
        </div>
    </div>`;
        })
        $('.data-container').html(html);
        $('.data-container .data').eq($(0).index()).css('visibility', 'visible');
        $('.order .filter').on('click', 'a', function () {
            $(this).addClass('active').siblings().removeClass('active');
            $('.data-container .data').eq($(this).index()).css('visibility', 'visible').siblings().css('visibility', 'hidden');
        })

    }()

    // 折线图
    + function () {
        var lineBox = document.querySelector('.line');
        var myChart = echarts.init(lineBox);
        var option = {
            grid: {
                top: '20%',
                left: '3%',
                right: '4%',
                bottom: '3%',
                show: true,// 显示边框
                borderColor: '#012f4a',// 边框颜色
                containLabel: true // 包含刻度文字在内
            },
            legend: {
                textStyle: {
                    color: '#4c9bfd' // 图例文字颜色
                },
                right: '10%' // 距离右边10%
            },
            xAxis: {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                axisTick: {
                    show: false // 去除刻度线
                },
                axisLabel: {
                    color: '#4c9bfd' // 文本颜色
                },
                axisLine: {
                    show: false // 去除轴线
                },
                boundaryGap: false  // 去除轴内间距
            },
            yAxis: {
                type: 'value',
                axisTick: {
                    show: false  // 去除刻度
                },
                axisLabel: {
                    color: '#4c9bfd' // 文字颜色
                },
                splitLine: {
                    lineStyle: {
                        color: '#012f4a' // 分割线颜色
                    }
                }
            },
            color: ['#00f2f1', '#ed3f35'],
            series: [
                {
                    name: '预期销售额',
                    data: [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                    type: 'line',
                    smooth: true
                }, {
                    name: '实际销售额',
                    data: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
                    type: 'line',
                    smooth: true
                }
            ]
        };
        myChart.setOption(option);
        window.addEventListener('resize', function () {
            myChart.resize();
        })
        var data = {
            year: [
                [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
            ],
            quarter: [
                [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
                [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
            ],
            month: [
                [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
                [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
            ],
            week: [
                [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
                [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
            ]
        }
        //tab栏切换效果
        $('.caption').on('click', 'a', function () {
            $(this).addClass('active').siblings('a').removeClass('active');
            $.each(option.series, (index, value) => {
                value.data = data[$(this).attr('data-date')][index];
            })
            myChart.setOption(option);
            index = $(this).index() - 1;
        })
        // 自动切换
        var index = 0;
        var timer = setInterval(function () {
            index++;
            if (index === 4) index = 0;
            $('.caption a').eq(index).click();
        }, 1500)

        $('.sales .chart').hover(function () {
            clearInterval(timer);
        }, function () {
            clearInterval(timer);
            timer = setInterval(function () {
                index++;
                if (index === 4) index = 0;
                $('.caption a').eq(index).click();
            }, 1500)
        })
    }()

    // 雷达图
    + function () {
        var radarBox = document.querySelector('.radar');
        var myChart = echarts.init(radarBox);
        var option = {
            tooltip: {
                show: true,
                // 控制提示框组件的显示位置
                position: ["60%", "10%"]
            },
            radar: {
                indicator: [
                    { name: "机场", max: 100 },
                    { name: "商场", max: 100 },
                    { name: "火车站", max: 100 },
                    { name: "汽车站", max: 100 },
                    { name: "地铁", max: 100 }
                ],
                // 修改雷达图的大小
                radius: "65%",
                shape: "circle",
                // 分割的圆圈个数
                splitNumber: 4,
                name: {
                    // 修饰雷达图文字的颜色
                    textStyle: {
                        color: "#4c9bfd"
                    }
                },
                // 分割的圆圈线条的样式
                splitLine: {
                    lineStyle: {
                        color: "rgba(255,255,255, 0.5)"
                    }
                },
                splitArea: {
                    show: false
                },
                // 坐标轴的线修改为白色半透明
                axisLine: {
                    lineStyle: {
                        color: "rgba(255, 255, 255, 0.5)"
                    }
                }
            },
            series: [
                {
                    name: "北京",
                    type: "radar",
                    // 填充区域的线条颜色
                    lineStyle: {
                        normal: {
                            color: "#fff",
                            width: 1,
                            opacity: 0.5
                        }
                    },
                    data: [[90, 19, 56, 11, 34]],
                    // 设置图形标记 （拐点）
                    symbol: "circle",
                    // 这个是设置小圆点大小
                    symbolSize: 5,
                    // 设置小圆点颜色
                    itemStyle: {
                        color: "#fff"
                    },
                    // 让小圆点显示数据
                    label: {
                        show: true,
                        fontSize: 10
                    },
                    // 修饰我们区域填充的背景颜色
                    areaStyle: {
                        color: "rgba(238, 197, 102, 0.6)"
                    }
                }
            ]
        };
        myChart.setOption(option);
        window.addEventListener('resize', function () {
            myChart.resize();
        })
    }()
    // 任务进度图
    + function () {
        var gaugeBox = document.querySelector('.gauge');
        var myChart = echarts.init(gaugeBox);
        var option = {
            series: [
                {
                    type: 'pie',
                    // 放大图形
                    radius: ['130%', '150%'],
                    // 移动下位置  套住50%文字
                    center: ['48%', '80%'],
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    // 起始角度，支持范围[0, 360]
                    startAngle: 180,
                    // 鼠标经过不变大
                    hoverOffset: 0,
                    data: [
                        {
                            value: 100,
                            itemStyle: {
                                // 颜色渐变#00c9e0->#005fc1
                                color: new echarts.graphic.LinearGradient(
                                    // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        { offset: 0, color: "#00c9e0" }, // 0 起始颜色
                                        { offset: 1, color: "#005fc1" } // 1 结束颜色
                                    ]
                                )
                            }
                        },
                        { value: 100, itemStyle: { color: '#12274d' } },
                        { value: 200, itemStyle: { color: 'transparent' } } // 透明隐藏第三块区域
                    ]
                }
            ]
        }
        myChart.setOption(option);
        window.addEventListener('resize', function () {
            myChart.resize();
        })
    }()

    // 各省热销
    + function () {
        // 实际开发中，这个数据通过ajax从服务端获取
        var hotData = [
            {
                city: '北京',  // 城市
                sales: '25, 179',  // 销售额
                flag: true, //  上升还是下降
                brands: [   //  品牌种类数据
                    { name: '可爱多', num: '9,086', flag: true },
                    { name: '娃哈哈', num: '8,341', flag: true },
                    { name: '喜之郎', num: '7,407', flag: false },
                    { name: '八喜', num: '6,080', flag: false },
                    { name: '小洋人', num: '6,724', flag: false },
                    { name: '好多鱼', num: '2,170', flag: true },
                ]
            },
            {
                city: '河北',
                sales: '23,252',
                flag: false,
                brands: [
                    { name: '可爱多', num: '3,457', flag: false },
                    { name: '娃哈哈', num: '2,124', flag: true },
                    { name: '喜之郎', num: '8,907', flag: false },
                    { name: '八喜', num: '6,080', flag: true },
                    { name: '小洋人', num: '1,724', flag: false },
                    { name: '好多鱼', num: '1,170', flag: false },
                ]
            },
            {
                city: '上海',
                sales: '20,760',
                flag: true,
                brands: [
                    { name: '可爱多', num: '2,345', flag: true },
                    { name: '娃哈哈', num: '7,109', flag: true },
                    { name: '喜之郎', num: '3,701', flag: false },
                    { name: '八喜', num: '6,080', flag: false },
                    { name: '小洋人', num: '2,724', flag: false },
                    { name: '好多鱼', num: '2,998', flag: true },
                ]
            },
            {
                city: '江苏',
                sales: '23,252',
                flag: false,
                brands: [
                    { name: '可爱多', num: '2,156', flag: false },
                    { name: '娃哈哈', num: '2,456', flag: true },
                    { name: '喜之郎', num: '9,737', flag: true },
                    { name: '八喜', num: '2,080', flag: true },
                    { name: '小洋人', num: '8,724', flag: true },
                    { name: '好多鱼', num: '1,770', flag: false },
                ]
            },
            {
                city: '山东',
                sales: '20,760',
                flag: true,
                brands: [
                    { name: '可爱多', num: '9,567', flag: true },
                    { name: '娃哈哈', num: '2,345', flag: false },
                    { name: '喜之郎', num: '9,037', flag: false },
                    { name: '八喜', num: '1,080', flag: true },
                    { name: '小洋人', num: '4,724', flag: false },
                    { name: '好多鱼', num: '9,999', flag: true },
                ]
            }
        ]
        // 各省热销内容填充
        var supHtml = '';
        var subHtml = '';
        $.each(hotData, function (index, value) {
            supHtml += `<li>
        <span>${value.city}</span>
        <span>${value.sales} <s class="${value.flag ? 'icon-up' : 'icon-down'}"></s></span>
    </li>`;
        })
        $('.province .sup').html(supHtml);
        // 绑定事件
        var index = 0;
        // 渲染函数
        function getList(elem){
            subHtml = '';
            elem.addClass('active').siblings().removeClass('active');
            $.each(hotData[elem.index()].brands, function (index, value) {
                subHtml += `<li><span>${value.name}</span>${value.num}<span> <s class="${value.flag ? 'icon-up' : 'icon-down'}"></s></span></li>`;
            });
            $('.province .sub').html(subHtml);
            index = elem.index();
        }
        $('.province .sup').on('mouseenter', 'li', function () {
            getList($(this));
        })
        $('.province .sup li').eq(0).mouseenter();
        // 定时滚动事件
        var timer = setInterval(function(){
            index++;
            if(index === 5) index = 0;
            getList($('.sup li').eq(index));
        },1200);
        $('.province .sup').hover(function () {
            clearInterval(timer);
        },function(){
            timer = setInterval(function(){
                index++;
                if(index === 5) index = 0;
                getList($('.sup li').eq(index));
            },1200);
        })
    }()