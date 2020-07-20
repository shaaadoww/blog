//引入用户集合构造函数，该文件已经有数据库里的数据,暴露出来的是一个对象，所有用{}获取User的值
const { User } = require('../../model/user');
//导入bcrypt
const bcrypt = require('bcrypt');

const login = async (req,res) => {
    //接收请求参数
    //res.send(req.body); //app.js已经配置好bodyParser(专门处理post请求参数)，这里直接用req.body就可以获取用户提交的数据
    const {email, password} = req.body;
    //二次验证，因为在浏览器可以禁止js，所以在服务器端也要验证一下
    if(email.trim().length == 0 || password.trim().length == 0){
        //send 输出到网页上 render成功的status一般默认200不用写，错误的话就改成400
        //return res.status(400).send('<h4>邮件地址或者密码错误</h4>');
        return res.status(400).render('admin/error', {msg: '邮件地址或者密码错误'});
    }
    //根据邮箱地址查询用户信息
    //这里要用异步函数的方法获取返回值，所以要把函数变成异步函数，只要在函数定义的前面加上async关键字，在findOne方法的前面加个await关键字，这样就可以通过返回值拿到异步api返回的结果了
    //如果查询到了用户 user变量的值是对象类型，对象中存储的是用户信息
    //如果没有查询到用户，user变量为空
    let user = await User.findOne({email});
    //查询到了用户
    if(user){
        //判断用户是否是启用状态,0shi
        if(user.state == 1){
            return res.status(400).render('admin/error', {msg: '该用户被禁用'});
        }
        //将客户端传递过来的密码和用户信息中的密码进行比对
        //通过bcrypt的compare方法将客户端传递过来的密码和用户信息中的密码进行比对
        //true 比对成果
        //false 比对失败
        const isValid = await bcrypt.compare(password, user.password);
        if(isValid){
            //登录成功
            //将用户名存储在请求对象中
            //session会在内部为用户生成一个唯一的sessionid，并把这个sessionid存储在服务端的cookie中
            req.session.username = user.username;
            //将用户角色存储在请求对象中
            req.session.role = user.role;
            //res.send('登录成功');
            //将user放到locals下面暴露给所有的页面，在页面里直接用userInfo就可以了，req.app拿到的就是app.js里面的app
            req.app.locals.userInfo = user;
            //对用户的角色进行判断
            if(user.role == 'admin'){

                //重定向到用户到列表页面,express提供的跳转页面的方法
                res.redirect('/admin/user');
            }else{
                res.redirect('/home/');
            }
        }else{
            //密码错误
            return res.status(400).render('admin/error', {msg: '邮件地址或者密码错误'});
        }
    }else{
        //没有查到
        return res.status(400).render('admin/error', {msg: '邮件地址或者密码错误'});
    }
}

module.exports = login;