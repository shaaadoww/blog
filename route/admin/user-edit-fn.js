//引入用户集合构造函数
const { User, validateUser } = require('../../model/user');
//引入加密模块
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    try{
        //调用../../model/user的validateUser模块验证用户信息
        await validateUser(req.body);
    }catch(e){
        //验证没有通过
        //e.message
        //重定向回用户添加页面,加个return 下面的代码不会再执行
        //return res.redirect(`/admin/user-edit?message=${e.message}`)
        //JSON.stringify() 将对象类型转换为字符串数据类型
        //next()方法只能传一个参数并且是字符串类型
        return next(JSON.stringify({path: '/admin/user-edit',message: e.message}));
    }

    //app.js已经配置好bodyParser(专门处理post请求参数)，这里直接用req.body就可以获取用户提交的数据
    //res.send(req.body);
    //根据邮箱地址查询用户是否存在，如果查到了 findOne返回的是这个邮箱的用户信息对象，如果没查到就是空
    let user = await User.findOne({email: req.body.email});

    //如果用户已经存在，邮箱地址已经被人占用
    if(user){
        //加个return 下面的代码不会再执行
        //return res.redirect(`/admin/user-edit?message=邮箱地址已经被占用`)
        return next(JSON.stringify({path: '/admin/user-edit',message: '邮箱地址已经被占用'}));

    }
    //对密码进行加密
    //生成随机字符串
    const salt = await bcrypt.genSalt(10);
    //加密
    const password = await bcrypt.hash(req.body.password, salt);
    //替换密码
    req.body.password = password;
    //res.send(req.body); //向页面中输出post拿到的数据

    //将用户信息添加到数据库中
    await User.create(req.body);
    //将页面重定向到用户列表页面
    res.redirect('/admin/user');

}