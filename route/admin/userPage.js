//导入用户集合构造函数
//require('../../model/user')导出的是用户对象{ User: Model { User }, validateUser: [Function: validateUser] }
const { User } = require('../../model/user');
// console.log(User);//Model { User }

module.exports = async (req,res) => {

    //在req.app.locals下面加的属性和值在模板中事可以直接拿到的
    //标识，表示当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';

    //接收客户端传递过来的当前页参数
    let page = req.query.page || 1;
    //每一页显示的数据条数
    let pagesize = 10;
    //查询用户数据的总数
    let count = await User.countDocuments({});
    //总页数
    let total = Math.ceil(count / pagesize);
    //页码对应的数据查询开始位置
    let start = (page - 1) * pagesize
    //将用户信息从数据库总查询出来
    //limit()限制查询数量，传入煤业显示的数据数量
    //skip()跳过多少条数据，传入显示数据的开始位置
    let users = await User.find({}).limit(pagesize).skip(start);

    //渲染用户列表模块
    //第二个参数是在用户列表页面呈现出来的值，可选
    res.render('admin/user',{
        users,
        page,
        total
    });
}