var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users.router');
var authRouter = require('./routes/auth.router');
var productsRouter = require('./routes/products.router');
var ordersRouter = require('./routes/orders.router');

var app = express();
//www.linkedin.com/in/julian-huarachi-mamani/
// view engine setup
https: app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('dotenv').config();


// Conecction base de datos
mongoose.connect(process.env.CONNECTION_STRING,{useNewUrlParser:true,useUnifiedTopology:true});
const connection = mongoose.connection;
connection.on('error', ()=>{
  console.log("error connection to database")
})
connection.once('open', ()=>{
  console.log("conected to database")
})

app.use('/', indexRouter);
// app.use('/auth', authRouter);
// app.use('/api/users', usersRouter);
// app.use('/api/products', productsRouter);
// app.use('/api/orders', ordersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, 'the endpoint does not exist'));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    errorcode: err.status || 500,
    message: res.locals.message,
  });
});

module.exports = app;
