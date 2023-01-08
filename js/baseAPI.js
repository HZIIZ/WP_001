// ajax 请求前会先调用这个函数
// 这个函数可以拿到给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在这里统一拼接url
    options.url = 'http://www.liulongbin.top:3007' + options.url;
});