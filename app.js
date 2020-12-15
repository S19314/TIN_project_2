var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var komputerRouter = require('./routes/komputerRoute');
var elementKomputerRouter = require('./routes/elementKomputerRoute');
var zestawElementaKomputerRouter = require('./routes/zestawElementaKomputerRoute');

const elementKomputerowyApiRouter = require('./routes/api/Element_KomputerowyApiRoute');
const komputerApiRoute = require('./routes/api/KomputerApiRoute');
const zestaw_Elementa_i_KomputeraApiRoute = require('./routes/api/Zestaw_Elementa_i_KomputeraApiRoute');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/komputers', komputerRouter);
app.use('/komputer-element', elementKomputerRouter);
app.use('/zestaw-komputera-element', zestawElementaKomputerRouter);


app.use('/api/komputer-elements', elementKomputerowyApiRouter);
app.use('/api/komputers', komputerApiRoute);
app.use('/api/zestaws', zestaw_Elementa_i_KomputeraApiRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
