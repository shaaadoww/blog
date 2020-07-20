//将文章集合的构造函数导入到当前文件中
const { Article } = require('../../model/article');
//导入mongoose-sex-page模块进行分页
const pagination = require('mongoose-sex-page');


module.exports = async (req, res) => {
    //接收客户端传递过来的页面
    const page = req.query.page;

    //在req.app.locals下面加的属性和值在模板中事可以直接拿到的
    //标识，表示当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';

    //查询所有文章数据,多集合联合查询 在find()后面链式调用populate()
    //author存的是_id 多集合联合查询populate会根据id在用户表将该用户信息查询出来并将集合对象嵌套到Article的id属性下面
    //page() 指定当前页
    // size() 指定每页显示的数据条数
    //display() 指定客户端要显示的页码数量
    //exec() 向数据库中发送查询请求
    const articles = await pagination(Article).find().page(page).size(10).display(3).populate('author').exec();
    // res.send(articles);

    res.render('admin/article',{
        articles
    });
}