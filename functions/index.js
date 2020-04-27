const functions = require('firebase-functions');


const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const firebaseUser = require('./firebaseUser');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(firebaseUser.validateFirebaseIdToken);

app.get('/', (req, res) => {
  console.log('Signed-in user:', req.user);
  return res.render('user', {
    user: req.user,
  });
});

exports.app = functions.https.onRequest(app);

