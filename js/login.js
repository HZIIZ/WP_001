$(function() {
    $('.link-register').on('click', function() {
        $('.login-box').hide();
        $('.register-box').show();
    });

    $('.link-login').on('click', function() {
        $('.register-box').hide();
        $('.login-box').show();
    });

    // 从layui中获取form对象
    var form = layui.form;
    // 自定义form对象的校验规则
    form.verify({
        // 校验密码格式
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次输入是否一致
        repwd: function(value, item) {
            var pwd = $('.register-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致';
            }
        }
    });

    var layer = layui.layer;
    // 注册事件
    $('.register-form').on('submit', function(event) {
        event.preventDefault();

        $.post('/api/reguser', { 'username': $('.register-form [name=username]').val(), 'password': $('.register-form [name=password]').val() }, function(res) {
            if (res.status !== 0) {
                layer.msg(res.message);
                return;
            }

            layer.msg('注册成功！');

            // 模拟点击去登录
            $('.link-login').click();
        });
    });

    // 登录事件
    $('.login-form').submit(function(event) {
        event.preventDefault();

        $.post('/api/login', { 'username': $('.login-form [name=username]').val(), 'password': $('.login-form [name=password]').val() }, function(res) {
            if (res.status !== 0) {
                layer.msg(res.message);
                return;
            }

            layer.msg('登录成功！');

            localStorage.setItem('token', res.token);

            location.href = '/index.html';
        });
    });
});