const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const passport = require('passport');
const Account = require('../models/account');

/* GET users listing. */
router.get('/', function(req, res) {
    res.render('users', {user: req.user});
});

/**
 * User login
 */
router.get('/login', (req, res) => {
    res.render('login');
});

// eslint-disable-next-line max-len
router.post('/login', passport.authenticate('local', {failureRedirect: '/users/login'}),
    function(req, res) {
        res.redirect('https://localhost:3001');
    });
/**
 * User registration
 */
router.get('/register', (req, res) => res.render('register'));

router.post('/register', (req, res, next) => {
    console.log('Registering User');
    const {username, password} = req.body;

    Account.register(new Account(username), password, function(err) {
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
