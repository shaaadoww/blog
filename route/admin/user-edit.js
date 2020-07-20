const { User } = require('../../model/user');

module.exports = async (req, res) => {

    //在req.app.locals下面加的属性和值在模板中事可以直接拿到的
    //标识，表示当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';

    // 获取到地址栏中的id参数
    const { message, id } = req.query;
    // 如果当前传递了id参数
    if (id) {
        // 修改操作
        let user = await User.findOne({_id: id});

        // 渲染用户编辑页面(修改)
        res.render('admin/article-edit', {
            message: message,
            user: user,
            link: '/admin/article-modify?id=' + id,//点击提交按钮时，id放在提交地址的后面作为参数传给服务器端
            button: '修改'
        });

    }else {
        // 添加操作
        res.render('admin/user-edit', {
            message: message,
            link: '/admin/user-add',
            button: '添加'
        });
    }


}