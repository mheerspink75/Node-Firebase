const functions = require('firebase-functions');
const firebaseUser = require('./firebaseUser');

const createError = require('http-errors');
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(firebaseUser.validateFirebaseIdToken);

app.get('/', (req, res) => {
  console.log('Signed-in user:', req.user);
  return res.render('user', {
    user: req.user,
  });
});

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

exports.app = functions.https.onRequest(app);

