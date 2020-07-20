function serializeToJson(form){
    var result = {};
    var f = form.serializeArray();
    //jq提供了一个方法 serializeArray() 可以拿到用户在表单输入的内容，以数组的格式返回
    // (2) [{…}, {…}]
    // 0: {name: "email", value: "1521177152@qq.com"}
    // 1: {name: "password", value: "123456"}
    // length: 2
    // __proto__: Array(0)
    //通过遍历的方法对拿到的对象做处理 {"email":"1521177152@qq.com"","password":"123456"}
    f.forEach(function(item){
        result[item.name] = item.value;
    });
    return result;
}