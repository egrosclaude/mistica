var express = require('express');
var router = express.Router();

router.get('/insumos', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
