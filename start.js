const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
var Mock = require('mockjs');
var Random = Mock.Random
const app = express();
let port = process.env.PORT || 8018;
var data = Mock.mock({
    'list|1-10': [{
        'id|+1': 1,
        "string":Random.image('200x100', '#4A7BF7', 'Hello')
    }]
})
app.use(express.static('test/app/dist')) // Express 使用相对路径, 因此 public 不需要在 url 中
app.use(bodyParser());
app.set('views', './views');
app.set('view engine', 'jade');
app.get('/getjson',(req,res,next)=>{
    res.json(data)
})
app.listen(port,()=>{
    console.log('Example app listening on port 8008!')
});
