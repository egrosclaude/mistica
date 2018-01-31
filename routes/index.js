var express = require('express');
var router = express.Router();


var Insumos = require('../models/insumos');



const listarInsumos = (req,res,next) => {
	Insumos.find({}, function(err, insumos) {
    	if (!err){ 
    	    console.log(insumos);
			res.render('insumos.hbs', { title: 'Insumos', insumos: insumos} ); 
    	} else {throw err;}
	});
};

const grabarInsumo = (req,res,next) => {
	//console.log('RECIBIDO insumos/nuevo',req.body);
	var newInsumo = new Insumos(req.body).save(function(err) {
		if(!err) {
			//console.log('insumo grabado');
			next();
		}
	});
};

router.get('/insumos/nuevo', (req,res,next) => {
	res.render('insumos-form.hbs', { } ); 
});

router.post('/insumos/nuevo', grabarInsumo, listarInsumos);

router.get('/insumos', listarInsumos);

router.get('/formulas', function(req, res) {
  console.log('estoy en formulas');
  res.render('formulas.hbs', { title: 'Fórmulas', message: 'Esta es la lista de fórmulas' });
  
});


router.get('/productos', function(req, res) {
  console.log('estoy en productos');
  res.render('productos.hbs', { title: 'Productos', message: 'Esta es la lista de productos' });
  
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Mística', mensaje: 'A ver' });
});
 
module.exports = router; 
