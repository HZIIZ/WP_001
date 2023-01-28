$(function() {
    getUserInfo();

    var layer = layui.layer;

    // 退出登录
    $('.logoutbtn').click(function() {
        layer.confirm('是否确认退出登录?', { icon: 3, title: '提示' }, function(index) {
            // 清除token
            localStorage.removeItem('token');

            // 跳转登录页
            location.href = '/login.html';

            layer.close(index);
        });
    });

});

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: { Authorization: localStorage.getItem('token') || '' },
        success: function(res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }

            renderAvatar(res.data);
        },
    });
}

function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name);

    if (user.user_pic !== null) {
        // 显示图片
        $('.layui-nav-img').attr('src', user.user_pic).show();
        // 隐藏文字
        $('.text-avatar').hide();
    } else {
        var firstWord = name[0].toUpperCase();
        $('.text-avatar').html(firstWord).show();
        $('.layui-nav-img').hide();
    }
}