var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', (req, res) => res.render('register'));

router.post('/register', (req, res) => {
  console.log(req.body);
  res.send('Login Finished');
});

module.exports = router;
