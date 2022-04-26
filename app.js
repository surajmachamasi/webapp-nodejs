var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var Analytics = require('analytics-node');
var analytics = new Analytics('4LAQ0uuBRgepNmC0DSpbg2YVDrJC8Q7y');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


analytics.identify({
  userId:'f4ca124298',
  traits: {
    name: 'Suraj Neyos',
    email: 'Suraj.machamasi@berrybytes.com',
    createdAt: new Date('2014-06-14T02:00:19.467Z')
  }
});


analytics.track({
  userId:'f4ca124298',
  event: 'Signed Up',
  properties: {
    plan: 'Enterprise'
  }
});

// analytics.track({
//   userId:'f4ca124298',
//   event: 'Bookmarked Article',
//   properties: {
//     title: 'Snow Fall',
//     subtitle: 'The Avalanche at Tunnel Creek',
//     author: 'John Branch'
//   }
// });


// analytics.identify("97980cfea0067", {
//   name: "Peter Gibbons",
//   email: "peter@example.com",
//   plan: "premium",
//   logins: 5
// });


// analytics.identify('97980cfea0085', {
//   email: 'suraj@berrybytes.com',
//   name: 'Suraj Neyos'
// });

// analytics.track("User Registered", {
//   checkinDate: new Date(),
//   myCoolProperty: "mYCoolProperty",
// });


// analytics.group("0e8c78ea9d9dsasahjg", {
//   name: "My_group_name",
//   employees: 3,
//   plan: "enterprise",
//   industry: "Technology"
// });





module.exports = app;
