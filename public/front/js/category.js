/**
 * Created by Administrator on 2018/1/15.
 */

//  页面一进来就要发送ajax请求获取一级分类
$(function(){
  $.ajax({
    type:'get',
    url:'/category/queryTopCategory',
    success:function(info){
      //console.log(info);
      $('.category_left .mui-scroll').html( template("tpl_left",info));

      //渲染第一个一级分类对应的二级分类。
      renderSecond(info.rows[0].id);
    }
  });

//根据一级分类的id渲染二级分类
function renderSecond(id){
  $.ajax({
    type:'get',
    url:'/category/querySecondCategory',
    data:{
      id:id
    },
    success:function(info){
    //console.log(info);
      $('.category_right .mui-scroll').html( template('tpl_right',info))
  }
  })
}

// 点击一级分类重新渲染对应的二级分类   用事件委托
$('.category_left .mui-scroll').on('click','li',function(){
  // 修改样式 active的类
  $(this).addClass('now').siblings().removeClass('now');
  // 获取id
  var id = $(this).data('id');
  //重新渲染
  renderSecond(id);

  //让category_right .mui-scroll 滚回到0,0的位置
  //mui(".mui-scroll-wrapper").scroll() 获取页面中所有的scroll对象，如果有多个，返回数组
  // 拿到的是一个数组，要让第二个区域回到0,0的位置，所以是scroll()[1]
  mui(".mui-scroll-wrapper").scroll()[1].scrollTo(0,0,500);

 })

});


