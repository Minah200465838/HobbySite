const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./controllers/index');
const usersRouter = require('./controllers/users');
// reference our new custom controller..everytime I make controllers, I have to add this
const hobby = require('./controllers/hobbys');
const auth = require('./controllers/auth');
const categories = require('./controllers/categories');


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


// use dotenv to read .env file with config vars
if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}

// mongodb connection using mongoose
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTION_STRING)
.then((res) => {
  console.log('Connected to MongoDB');
})
.catch(() => {
  console.log('Connection to MongoDB Failed');
});

// passport auth config
const passport = require('passport');
const session = require('express-session');

app.use(session({
  secret: process.env.PASSPORT_SECRET,
  resave: true,
  saveUninitialized: false
}));
//* passport for logiin *//
// start passport w/session support
app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/user');
passport.use(User.createStrategy());

// read / write session variables
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// google auth strategy for passport
// 1. authenticate google app w/api keys
// 2. check if we already have this user w/this Google id in the users collection
// 3. if user not found, create a new Google user in our users collection
const googleStrategy = require('passport-google-oauth20').Strategy;
passport.use(new googleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
  User.findOrCreate({oauthId: profile.id }, {
    username: profile.displayName,
    oauthProvider: 'Google'
  }, (err, user) => {
    return done(err, user);
  })
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// map all requests at /hobby to our own hobby.js controller..pointing /hobby and sned those to fmaily controller
app.use('/hobby', hobby);
app.use('/auth', auth);
app.use("/categories", categories);

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
