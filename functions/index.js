const functions = require("firebase-functions");
require('./util/firestore_test')
const express = require("express");
const engines = require("consolidate");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.engine("hbs", engines.handlebars);
app.set('views', './views');
app.set("view engine", "hbs");

app.use('/', indexRouter);
app.use('/users', usersRouter);


module.exports.app = functions.https.onRequest(app);

