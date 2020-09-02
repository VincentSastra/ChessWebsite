var express = require('express');
var router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/react', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

module.exports = router;
