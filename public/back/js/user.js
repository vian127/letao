/**
 * Created by Administrator on 2018/1/14.
 */
$(function(){

  var page= 1;
  var pageSize= 5;
  //1. 发送ajax请求，获取到用户的数据
  //2. 通过模版引擎把数据渲染出来
  render();

function render(){
  $.ajax({
    type:'get',
    url:'/user/queryUser',
    data: {
      page:page,
      pageSize:pageSize,
    },
    success:function(info){
      //console.log(info);
      $('tbody').html( template('tpl',info));

      //渲染分页
      //如果引入的bootstrap的版本是3+，
      // 1. 分页的盒子必须是ul元素
      // 2. 还需要指定一个属性：bootstrapMajorVersion指定bootstrap的版本
      $('#paginator').bootstrapPaginator({
        bootstrapMajorVersion:3, //设置bootstrap的版本
        currrentPage: page, //设置当前页
        totalPages:Math.ceil(info.total/info.size),//设置总页数,根据返回结果的总条数/每页的条数
        numberOfPages: 5, //空间上显示的条数  p:当前点击的按钮值
        onPageClicked: function (a, b, c, p) {
          //让当前页码变成p
          page = p;
          //重新渲染即可
          render();
        }
      })
     }
   });
  }


  //用户启用禁用的功能
  //1. 给禁用或者启用注册点击事件， 需要注册委托事件
  //2. 弹出模块框
  $('tbody').on('click','.btn',function(){
    //让模态框显示
    $("#userModal").modal("show");
    // 获取id
    var id = $(this).parent().data('id');
//获取到是否禁用  如果是btn-success类，说明需要启用这个用户，需要传1
    var isDelete = $(this).hasClass('btn-success')?1:0;
    //console.log(id,isDelete);

    // 如果在里面注册点击事件就要清除之前的事件，如果在外面注册就要保证那两个变量是全局的
    $('.btn_confirm').off().on('click',function(){
      $.ajax({
        type:"post",
        url:"/user/updateUser",
        data: {
          id:id,
          isDelete:isDelete,
        },
        success:function(info){
          if(info.success){
            $("#userModal").modal('hide');
            render();
          }
        }
      })
    });
  });

});