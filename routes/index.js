var express = require('express');
//var async = require('async');
var router = express.Router();


var Arts = require('../models/arts');
var Tags = require('../models/tags');
var Ajax = require('../public/js/ajax');

//router.get('/arts/nuevo', Arts.create);
//router.post('/arts/nuevo', Arts.doCreate);
router.post('/arts/edit/:id', Arts.edit);
router.get('/arts/delete/:id', Arts.delete);
router.post('/arts/tags', Tags.create, Arts.edit);
router.get('/arts/:id', (req, res) => {
    Arts.findOne({_id : req.params.id }, 
		(err, arts) => {
			console.log("router get arts/:id",arts);
			res.send(arts);
	    });
});

router.get('/arts', Arts.list);
router.get('/tags/delete/:id', Tags.delete);
router.post('/tags', Tags.create);
router.get('/tags', Tags.list);


router.get('/formulas', function(req, res) {
  console.log('estoy en formulas');
  res.render('formulas.hbs', { title: 'Fórmulas', message: 'Esta es la lista de fórmulas' });
  
});


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Mística', mensaje: 'Mística' });
});
 
module.exports = router; 

