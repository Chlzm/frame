var [p1,p2,taskName,...fileNames] = process.argv;
taskName = taskName.split(':')[0].split('-')[0];
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const apis = require('./'+taskName+'/api');

const app = express();
let port = process.env.PORT || 8080;
app.use(express.static('./')) // Express 使用相对路径, 因此 public 不需要在 url 中
app.use(bodyParser());
app.set('views', './views');
app.set('view engine', 'jade'); 
for(let i in apis){
    app.get('/'+i,(req,res,next)=>{
        res.json(apis[i])
    })
}
app.listen(port,()=>{
    console.log('在浏览器中打开 localhost:8080!')
});
