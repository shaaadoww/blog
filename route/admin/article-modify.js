//引入formidable第三方模块 解析客户端传过来的请求参数，该模块可以处理上传文件
const formidable = require('formidable');
const path = require('path');
const { Article } = require('../../model/article');

module.exports = async (req,res) => {
    //即将要修改的用户id,id是get过来的
    const id = req.query.id;

    let article = await Article.findOne({_id: id});
    // 从数据库里拿出来的封面
    const cover_data =  article.cover;
    console.log(cover_data);
    if(article){
        //创建表单解析对象
        const form = new formidable.IncomingForm();
        //配置上传文件的存放位置
        form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
        //保留上传文件的后缀，默认不保留
        form.keepExtensions = true;
        //解析表单
        form.parse(req, async (err, fields, files) => {
            // err 错误对象，如哦表单解析失败，err里面存储错误信息 如果表单解析成功，err将会是null
            // fields 对象类型 保存普通表单数据
            // files 对象类型 保存了和上传文件相关的数据
            // split() 方法用于把一个字符串分割成字符串数组。
            // res.send(files.cover.path.split('public')[1]);

            // 修复因为没有上传图片而传入一个随机path的小问题，如果没有上传图片，就没有拿到图片名字，那么图片的封面就是从数据库里拿出来的那个
            // 如果上传了图片，那么封面就是上传的那个封面
            console.log(files,files.cover.name);
            if(!files.cover.name){
                var cover = cover_data;
                console.log(cover_data,'cover_data');
            }else{
                var cover = files.cover.path.split('public')[1];
            }
            await Article.updateOne({_id: id},{
                title: fields.title,
                publishDate: fields.publishDate,
                cover: cover,
                content: fields.content
            });
            //将页面重定向到文章列表页面
            res.redirect('/admin/article');
        })
    }

}