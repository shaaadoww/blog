//引入mogoose 模块
const mongoose = require('mongoose');

//创建文章集合规则
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 20,
        minlength: 1,
        required: [true, '请填写文章标题']
    },
    author:{
        type: mongoose.Schema.Types.ObjectId, //数据库特有类型
        ref: 'User', //与数据库的用户集合关联起来，作者就是当前用户，User是user.js创建的而用户集合的名字,这里存储的是User的_id字段
        required: [true, '请传递作者'],
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    cover: {
        type: String,
        default: null
    },
    content: {
        type: String
    }
});

//根据规则创建集合
const Article = mongoose.model('Article',articleSchema);

//将集合规则作为模块成员进行导出
module.exports = {
    Article
}

