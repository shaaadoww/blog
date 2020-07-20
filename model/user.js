//创建用户集合（创建数据）
//引入mongoose第三方模块
const mongoose = require('mongoose');
//导入bcrypt
const bcrypt = require('bcrypt');
//引入joi模块
const Joi = require('joi');
//创建用户集合规则
//创建Schema对象
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20
    },
    email:{
        type: String,
        //保证邮箱地址在插入数据库时不重复
        //unique：true, //索引值唯一
        unique: true,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    //admin 超级管理员
    //normal 普通管理员
    role:{
        type: String,
        required: true,
    },
    //0 启用状态
    //1 禁用状态
    state:{
        type: Number,
        default: 0
    },
});

//创建集合
const User = mongoose.model('User',userSchema);

//测试数据，为了初始化数据库，方便登录，进行后续操作，只执行一次就可以了，初始化后把代码注释掉
// User.create({
//     username: 'shadow',
//     email: '1521177152@qq.com',
//     password: '123456',
//     role: 'admin',
//     state: '0'
// }).then(() => {
//     console.log('用户创建成功')
// }).catch(() => {
//     console.log('用户创建失败')
// })

//初始化密码加密
async function createUser(){
    //生成随机字符串
    const salt = await bcrypt.genSalt(10);
    //给密码加密--拼接随机字符串
    const pass = await bcrypt.hash('123456',salt);
    const user = await User.create({
        username: 'shadow',
        email: '1521177152@qq.com',
        password: pass,
        role: 'admin',
        state: '0'
    });
}
//createUser();

//验证用户信息
const validateUser = user => {
    //定义对象的验证规则
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合规则')),
        email: Joi.string().email().required().error(new Error('邮箱格式不符合要求')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码不符合要求')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    };
    //实施验证
    return Joi.validate(user, schema); //return 返回给validateUser，让validateUser处理
}

//因为要对创建的集合进行增删改查的操作，所以要把该文件暴露出去，其他文件才能使用
//将用户集合做为模块成员进行导出，暴露出去
module.exports = {
    User,
    validateUser
}