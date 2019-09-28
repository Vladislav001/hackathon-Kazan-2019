const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const flash = require('connect-flash');

require('dotenv').config();

// connect to DB
mongoose.connect('mongodb://admin:123456v@ds119018.mlab.com:19018/hackathon-final', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

app.use(cors());
app.set('views', path.join(__dirname, 'template'));

app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const routes = require('./routes/index');
app.use(flash());
app.use('/', routes);

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
// });

module.exports = app;