//该文件是项目的入口文件 也是项目的主文件
//要创建网站服务器，首先要引入express框架
const express = require('express');
//处理路径的模块
const path = require('path');
//引入body-parser模块 用来处理post请求参数
const bodyParser = require('body-parser');
//引入express-session模块
const session = require('express-session');
//导入art-template模板引擎
const template = require('art-template');
//导入dateformat模块 处理日期
const dateFormat = require('dateformat');
//创建网站服务器
const app = express();
//连接数据库
require('./model/connect');

//初始化一下数据库登录数据,实际开发中是在路由中对数据库操作，而不是在app.js，所以初始化完直接注释掉
//require('./model/user');

//处理post请求参数 --只能处理普通表单，不能处理文件上传
//拦截请求交给bodyparser处理
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'secret key',
    cookie: {
        //cookie失效时间
        maxAge: 48 * 60 * 60 * 1000  //两天的毫秒数
    }
}));

//第一项配置，告诉express当前的模板放在了哪个文件夹下面，当调用res.render方法的时候，方法内部会获取位置信息，从而拼接位置
app.set('views',path.join(__dirname,'views'));
//第二项配置，诉express渲染模板的时候，如果没写后缀，默认后缀是什么
app.set('view engine', 'art');
//当渲染后缀为art的模板时，所用的模板引擎是什么
app.engine('art',require('express-art-template'));
//配置好以上三行代码之后，才能用render方法渲染模板

//向模板内部导入dateFormat变量
//template 是导入的const template = require('art-template');
template.defaults.imports.dateFormat = dateFormat;

//开放静态资源文件 (css,js那些)
//拦截所有的请求交给express处理
app.use(express.static(path.join(__dirname,'public')));

//引入路由模块
//require的返回值是module.export对象，实际上就是路由对象
const home = require('./route/home');
const admin = require('./route/admin');

//用app.use拦截请求，判断用户登录状态
app.use('/admin', require('./middleware/loginGuard'));

//给路由对象匹配请求路径
app.use('/home',home);
app.use('',home);
app.use('/admin',admin);

//错误处理中间件
app.use((err, req, res, next) => {
    // 将字符串对象转换为对象类型
    // JSON.parse()
    const result = JSON.parse(err);
    //{path: '/admin/user-edit', message: '密码比对失败，不能进行信息修改',id: id};
    //有可能有多个参数，所以要遍历
    let params = [];
    for(let attr in result){
        if(attr != 'path'){
            params.push(attr + '=' + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
})


//一个网站服务器要向外监听一个端口才能向外提供服务
//监听端口
app.listen(80);
console.log('网站服务器启动成功')