var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mailer = require("./helpers/sendMailer.mailer");

const userRoutes = require("./routes/user.route");
const roleRoutes = require("./routes/role.route");
const allRoutes = require("./routes/route.route");
const productRoutes = require("./routes/product.route");
const orderRoutes = require("./routes/order.route");


require('dotenv').config()
require("./db/db.connection").reConnectMongoose()


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "./client/dist/mobi-star")));
app.use("/api/user", userRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/route", allRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
app.post('/api/contact', (req, res) => {
  try {
    mailer.sendMailCaontactUs(
      req.body.name,
      req.body.email,
      req.body.sub,
      req.body.message
    );
    res.status(200).send({
      apiStatus: true,
      msg: "send message successfully!",
      data: req.body.message,
    });
  }
  catch (e) {
    res.status(500).send({
      apiStatus: false,
      msg: "send message faild!",
      data: e.messgae
    })
  }
})
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/dist/mobi-star", "index.html"));
})
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

module.exports = app;
