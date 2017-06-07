/**
 * nodejs api模块
 * demoUrl {String}  模拟的接口地址
 * demoData { ? }    数据
 * */

var Mock = require('mockjs');
var Random = Mock.Random;
var demoData = Mock.mock({
    'list|1-10': [{
        'id|+1': 1,
        "string": Random.image('200x100', '#4A7BF7', 'Hello'),
        "Date":Random.date('yyyy-MM-dd')
    }]
});
module.exports = {
    'test/getJSON': demoData,    // 接口1
    'demoUrl2': demoData    // 接口2
}