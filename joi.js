//引入joi模块
const Joi = require('joi');

//定义对象的验证规则
const schema = {
    username: Joi.string().min(2).max(5).required().error(new Error('username属性没有通过验证')),
    birth: Joi.number().min(1900).max(2030).error(new Error('birth没有通过验证'))
};

async function run(){
    //validate方法返回promise对象，可以在后面通过then和catch捕获错误信息，也可以通过异步函数的方式捕获，要注意的是如果通过异步函数的方式验证要通过try。。。catch捕获错误信息
    try{
        //实施验证
        await Joi.validate({username: 'ab', birth: '2040'}, schema);
    }catch(ex){
        console.log(ex.message);
        return;
    }
    console.log('验证通过');
}

run();