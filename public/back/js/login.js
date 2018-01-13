/**
 * Created by Administrator on 2018/1/11.
 */
$(function(){
  var $form = $('form');


  // 要求：用户名和密码不能为空，且长度6-12；
  // 初始化表单校验插件
  // 表单校验插件，在表单提交的时候做校验，如果检验失败了，会阻止表单的提交，如果校验成功了就会让表单继续提交

  $form.bootstrapValidator({

    // 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid:'glyphicon glyphicon-ok',
      invalid:'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //配置校验规则，校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        //里面可以配置username所有的校验
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          callback: {
            message: '用户名不存在'
          }
        }
      },
      // 密码校验
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          callback: {
            message: '密码输入有误'
          },
            // 长度校验
            stringLength: {
            min: 6,
            max: 12,
            message:'密码必须在6-12'
          }
        }
      },

    }
  });

  //需要给表单注册一个校验成功的事件，这个事件会在表单校验成功的时候触发  success.form.bv(为什么注册这个事件：因为客户点提交就会跳转页面，已填入的数据就会没有，万一有填错了，又要重新填了)
$form.on("success.form.bv",function(e){
  //阻止表单提交
  e.preventDefault();
  //发送ajax请求
  $.ajax({
    type:'post',
    url:'/employee/employeeLogin',
    datatype:'json',
    data:$form.serialize(),
    success:function(info) {
      //console.log(info);  都正确时是true，用户名，密码错误都会输出错误信息
      if(info.success) {
        //跳转到index页面
        location.href='index.html';
      }

      // 当error=1000时，用户名错误
      if(info.error==1000) {
        //使用updateStatus方法，把用户名验证改成失败即可
        //$form.data("bootstrapValidator")用户获取插件实例，通过这个实例调用一些方法 3个参数  1.字段名...username  2.状态：VALID INVALID
        $form.data("bootstrapValidator").updateStatus('username','INVALID','callback');
      }

      // 1001时密码错误
      if(info.error==1001) {
        $form.data("bootstrapValidator").updateStatus('password','INVALID','callback');
      }
    }
  });
})

  // 给reset按钮注册一个点击事件
  $("[type='reset']").on('click',function(){
    //重置校验的样式  里面加true也会重置输入的内容
    $form.data('bootstrapValidator').resetForm(true);
  });
});