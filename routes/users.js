var express = require('express');
var router = express.Router();

const Account = require('../models/account');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', (req, res) => res.render('register'));

router.post('/register', (req, res, next) => {
  console.log('Registering User');

  Account.register(new Account({username: req.body.username}), req.body.password, function(err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }

    console.log('user registered!');

    res.redirect('/');
  });

  console.log(req.body.username + ' registered!');
});

module.exports = router;
