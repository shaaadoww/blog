const { Article } = require('../../model/article');
const { Comment } = require('../../model/comment');

module.exports = async (req, res) => {
    //接收客户端传递过来的文章id
    const id = req.query.id;
    //根据id查询文章详细信息
    const article =  await Article.findOne({_id: id}).populate('author');
    //根据文章id查询评论信息
    const comments =  await Comment.find({aid: id}).populate('uid');

    res.render('home/article.art',{
        article,
        comments
    });

}

