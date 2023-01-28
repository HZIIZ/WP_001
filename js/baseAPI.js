// ajax 请求前会先调用这个函数
// 这个函数可以拿到给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在这里统一拼接url
    options.url = 'http://www.liulongbin.top:3007' + options.url;

    // 统一为有权限校验的接口，设置请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        };
    }

    // 全局挂载complete函数，统一处理 登录权限控制
    options.complete = function(res) {
        // 成功或失败回调之后，都会调用
        if (res.responseJSON.status === 1 &&
            res.responseJSON.message === '身份认证失败！') {
            // 清除token
            localStorage.removeItem('token');

            // 跳转登录页面
            location.href = '/login.html';
        }
    }
});