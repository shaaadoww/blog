const { Article } = require('../../model/article');
var fs = require('fs');

module.exports = async (req, res) => {
    //获取要删除的文章id
    //res.send(req.query.id);

    let article = await Article.findOne({_id: req.query.id});

    // 根据id删除用户
    await Article.findOneAndDelete({_id: req.query.id});

    // 删除对应的图片
    var filepath = '../../public'+ article.cover;
    fs.unlinkSync(filepath);
    //将页面重定向到用户页面
    res.redirect('/admin/article');
}