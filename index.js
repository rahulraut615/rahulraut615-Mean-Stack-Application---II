const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());

app.use(cors());
//create static path
app.use(express.static(path.join(__dirname,'dist/Bookstore')));


url = "mongodb://localhost:27017/bookstore"
//mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true)
mongoose.connect(url,{
    useNewUrlparser:true,
    useUnifiedTopology:true,
    family: 4,
    
}).then(()=>{
    console.log('connection istablished');
},error=>{
    console.log('Error occured'+error)
});
// Make Port and Server
 const bookRouter = require('./node-backend/routes/book.routes');
// const bodyParser = require('body-parser');

//app.use(express.urlencoded());
//Api root
app.use('/api',bookRouter);
//port create
const port = process.env.port || 8000;
app.listen(port,()=>{
    console.log('server listing on '+port+' port')
}); 
//404 Error Handler..
// error hander

app.use((req,res,next)=>{
    next(createError(404));
});

//Base Route
app.get((req,res)=>{
res.send('invalid End Point');
});

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist/Bookstore/index.html'));
});

app.use(function(err, req,res,next){
    console.error(err.message);
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});