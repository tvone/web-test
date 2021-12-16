var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')


var indexRouter = require('./routes/index');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({
    useTempFiles : true
}))

app.use('/', indexRouter);
app.use('/user', require('./routes/user'));
app.use('/api',require('./routes/upload'))
app.use('/api',require('./routes/category'))
app.use('/api',require('./routes/product'))
app.use('/api',require('./routes/payment'))
app.use('/api',require('./routes/order'))
// MongoDB:
mongoose.connect(process.env.MONGODB_URL,{
    useCreateIndex : true,
    useFindAndModify : false,
    useNewUrlParser : true,
    useUnifiedTopology : true,
},err=>{
    if(err) throw err
    console.log('MongoDB to Connect')
})


// Check deploy heroku:
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
  }

module.exports = app;
