/**
 * Created by Administrator on 2018/1/15.
 */
$(function(){
  var page= 1; // 当前页
  var pageSize= 5; // 每页的条数

  //功能一:渲染一级分类列表
  var render=function(){
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data: {
        page:page,
        pageSize:pageSize,
      },
      success:function(info){
        //console.log(info);
        $('tbody').html( template('tpl',info));

        //分页渲染
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,p){
            //修改当前页，重新渲染
            page= p;
            render();
          }
        });
      }
    });
  }
  render();

  //添加分类
  $('.btn_add').on('click',function(){
    $('#addModal').modal('show');
  });

  //表单验证
  var $form=$('form');
  $form.bootstrapValidator({
    //配置校验时显示的图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //配置校验规则,校验字段
    fileds: {
      category:{
        validators: {
          notEmpty: {
            message:'一级分类不能为空'
          }
        }
      }
    }
  });

  //需要给表单注册一个校验成功的事件，这个事件会在表单校验成功的时候触发  success.form.bv(为什么注册这个事件：因为客户点提交就会跳转页面，已填入的数据就会没有，万一有填错了，又要重新填了)
  $form.on("success.form.bv",function(e){
    //阻止表单默认提交
    e.preventDefault();
    //发送ajax 请求
    $.ajax({
      type: 'post',
      url:"/category/addTopCategory",
      data:$form.serialize(),
      success:function(info){
        //console.log(info);
        if(info.success){
          $("#addModal").modal('hide');
          //重新渲染，因为添加的数据显示在第一页，重新渲染第一页
          page=1;
          render();
          //重置表单
          $form.data("bootstrapValidator").resetForm(true);
        }
      }
    })
  })

})