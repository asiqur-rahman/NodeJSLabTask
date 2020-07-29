var express=require('express');
var app=express();
var bodyParser=require('body-parser');

//configure app
app.set('view engine','ejs');

//routing
// app.get('/',require('./loginController'));
app.use(bodyParser());
app.use(require('./controller/controller'));


//server create
var port=3333;
app.listen(port,function(){
  console.log('Server connected to the port 3333');
})
