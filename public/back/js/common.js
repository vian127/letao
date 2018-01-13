/**
 * Created by Administrator on 2018/1/13.
 */
$(function(){
  //进度条功能
  NProgress.configure({ showSpinner: false});//关闭进度环

  $(document).ajaxStart(function(){
    //在发送ajax之前，要开启进度条，ajax结束后，要关闭进度条。
    //使用进度条插件
    NProgress.start();
  });

  $(document).ajaxStop(function(){
    //本地接口，速度很快，加一个延时，假装是在联网
    setTimeout(function(){
      NProgress.done();
    },1000)
  })
});


//在非登陆页面，发送ajax请求，询问用户是否登录，如果没登录，跳转到登录页面。
if(location.href.indexOf("login.html")==-1) {
  $.ajax({
    type:"get",
    url:"/employee/checkRootLogin",
   success:function(info) {
     if(info.error==400) {  //没有登录
       //console.log(info);
       location.href="login.html";
     }
   }
  });
}


// 二级菜单的显示隐藏功能
  $('.second').prev().on('click',function(){
    $(this).next().slideToggle();
  });

//侧边栏显示隐藏功能
//已经写好了类，让侧边栏出去-180  让mian的padding到0；
//加上动画，切换类名就可以
$('.icon_menu').on('click',function(){
  $('.lt_aside').toggleClass('now');
  $('.lt_main').toggleClass('now');
});


// 退出显示模态框
$('.icon_logout').on('click',function(){
  $('#logoutModal').modal('show');


})
//里面会重复的注册这个点击事件，不会覆盖，导致注册很多次，
//1. 在外面注册 就要把之前的事件清除掉 off()。
$('.btn_logout').on('click',function(){
  //需要发送ajax,请求退出
  $.ajax({
  type:'get',
  url:"/employee/employeeLogout",
  success:function(info) {
    if(info.success) {
      location.href="login.html";
    }
  }
 });
})