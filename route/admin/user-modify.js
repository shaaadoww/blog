const { User } = require('../../model/user');
const bctypt = require('bcrypt');

module.exports = async (req,res,next) => {
    //接收客户端传递过来的请求参数
    const { username, email, role, state,password } = req.body;
    //即将要修改的用户id,id是get过来的
    const id = req.query.id;

    let user = await User.findOne({_id: id});

    const isValid = await bctypt.compare(password, user.password);
    //密码比对成功
    if(isValid){
        // res.send('密码比对成功');
        //将用户信息更新到数据库中
        await User.updateOne({_id: id},{
            username: username,
            email: email,
            role: role,
            state: state
        });

        //将页面重定向到用户列表页面
        res.redirect('/admin/user');
    }else{
        //密码比对失败
        let obj = {path: '/admin/user-edit', message: '密码比对失败，不能进行信息修改',id: id};
        next(JSON.stringify(obj));
    }
}