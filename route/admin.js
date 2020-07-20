//引入express框架
const express = require('express');

//创建博客展示页面路由
const admin = express.Router();

//渲染登录页面 --- 二级路由
admin.get('/login', require('./admin/loginPage'));
//在模板文件当中，外联资源的相对路径是相对于浏览器中的请求路径的，请求路径有可能变来变去的，不安全，所以外联资源要写绝对路径，/ 代表绝对路径

//默认指向登录页面
admin.get('/', require('./admin/loginPage'));

//实现登录功能
admin.post('/login', require('./admin/login'));

//创建用户列表路由
admin.get('/user', require('./admin/userPage'));

//实现退出功能
admin.get('/logout', require('./admin/logout'));

//创建用户编辑页面
admin.get('/user-edit', require('./admin/user-edit'));

//创建实现用户添加功能路由
admin.post('/user-edit', require('./admin/user-edit-fn'));

//创建实现用户修改功能路由
admin.post('/user-modify', require('./admin/user-modify'));

//删除用户功能路由
admin.get('/delete',require('./admin/user-delete'));

//文章列表页面路由
admin.get('/article',require('./admin/article'));

//页面编辑页面路由
admin.get('/article-edit',require('./admin/article-edit'));

//实现文章添加页面路由
admin.post('/article-add',require('./admin/article-add'));

//实现文章修改功能路由
admin.post('/article-modify', require('./admin/article-modify'));

//实现文章删除功能路由
admin.get('/article-delete', require('./admin/article-delete'));

//将路由对象做为模块成员进行导出
module.exports = admin;