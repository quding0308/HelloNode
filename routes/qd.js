var express = require('express');
var router = express();

// 直接返回一段文字
router.get('/test1', function(req, res, next) {
    // res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send('Hello World!');
});

// 直接加载某个html文件
router.get('/test2', function(req, res, next) {
    // res.setHeader('Cache-Control', 'public, max-age=3600');
    res.sendfile('views/qd/test2.html');
});

router.get('/test3', function(req, res, next) {
    // res.setHeader('Cache-Control', 'public, max-age=3600');
    res.sendfile('views/qd/test3.html');
});

router.get('/demo', function(req, res, next) {
    // res.setHeader('Cache-Control', 'public, max-age=3600');
    res.sendfile('views/qd/demo.html');
});




//////////// pug  /////////////
router.get('/', function(req, res, next) {
    // res.send('hello quding111');
    // 使用模板渲染
    res.render('qd/index', { title: 'Express' });
});

router.get('/redirect', function(req, res, next) {
    // res.render('qd/help', { title: 'Express' });
    res.redirect('help');
});

/** 
 * 会缓存到webview，过期之前不会再请求server
 */
router.get('/help', function(req, res, next) {
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.render('qd/help', { title: 'Express' });
});

/**
 * Manifest 使用后，会忽略Cache-Control的设置
 * Manifes有两个缺点：1. 全量更新，页面整个要刷新一次
 * 
 */
router.get('/offline', function(req, res, next) {
    // res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.render('qd/offline', { });
});

module.exports = router;