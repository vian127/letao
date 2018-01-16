/**
 * Created by Administrator on 2018/1/14.
 */
//初始化scroll控件：
mui('.mui-scroll-wrapper').scroll({
  indicators: false, //是否显示滚动条
});

// 初始化轮播图
 mui('.mui-slider').slider({
  interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
});