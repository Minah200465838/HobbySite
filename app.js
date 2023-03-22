const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./controllers/index');
const usersRouter = require('./controllers/users');
// reference our new custom controller..everytime I make controllers, I have to add this
const hobby = require('./controllers/hobby');

const app = express();

// view engine setup ..path to the views(hbs-handle bar)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// images
// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// images
app.use(express.static("images"));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// map all requests at /hobby to our own hobby.js controller..pointing /hobby and sned those to fmaily controller
app.use('/hobby', hobby);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



// image ..
let layout = (req, res) => {
  // show homepage if url is /
  if (req.url == '/') {
      res.writeHead(200, {'Content-Type':'text/html'});
      res.write('<link rel="stylesheet" href="css/app.css"/>');
      res.write(`<img src="/public/images/minahlogo.png" alt="photo" />`);
  }
  else{
      //show 404 if url is anything besides /
      res.writeHead(404, {'Content-Type':'text/html'}); 
      res.write('<link rel="stylesheet" href="css/app.css"/>');
      res.write('<h3>Error - Page Not Found</h3>');
     
  } 
  res.end(); 
}


module.exports = app;
