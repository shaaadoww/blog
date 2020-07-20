//导入bcrypt
const bcrypt = require('bcrypt');

//异步api只能出现在异步函数，所以在函数前面加async就是异步函数了
async function run(){
    //生成随机字符串
    //genSalt方法接收一个数值作为参数
    //数值越大，生成的随机字符串复杂度越高
    //数值越小，生成的随机字符串复杂度越低
    //默认值是 10
    const salt = await bcrypt.genSalt(10) //genSalt(10) 返回的是一个promise对象，在前面加await关键字，通过返回值的方式接收返回结果，await只能用在异步函数中
    //hash()对密码进行加密
    //两个参数
    //1.要进行加密的明文
    //2.随机字符串
    //返回值是加密后的密码
    //genSalt()和hash（）都是异步api 所以在前面加个await
    const result = await bcrypt.hash('123456',salt);
    //console.log(salt);
    console.log(result);
}

run();