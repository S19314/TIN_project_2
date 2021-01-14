var createError = require('http-errors');
var express = require('express');
var multer = require('multer');
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
// const upload = multer({ dest: "uploads" });
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // INTERNET=> //app.use(express.static(__dirname + "/public/"));

app.use(multer({ storage: storageConfig }).single("foto"));

// app.post("/komputer-element/add", upload.single("foto"), function (req, res, next) { });
app.post("/komputer-element/add");
/*
, function (req, res, next) {
  console.log("START MIDDLEWARE");
  let filedata = req.file;

  console.log(filedata);
  res.para
  /*
  if (!filedata)
    res.send("Błąd przy załadowaniu pliku na serwer.");
  else
    res.send("Plik został załadowany");
  * /
  console.log("END MIDDLEWARE")
  next();  // под вопросом, но всё же 
});
*/
app.post("/komputer-element/edit", function (req, res, next) {
  let filedata = req.file;
  console.log(filedata);
  if (!filedata)
    res.send("Błąd przy załadowaniu pliku na serwer.");
  else
    res.send("Plik został załadowany");

  next();  // под вопросом, но всё же 
});

app.use('/komputer-element', elementKomputerRouter);
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
