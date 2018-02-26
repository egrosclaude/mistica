var express = require('express');
var async = require('async');
var router = express.Router();


var Insumos = require('../models/insumos');
var Tags = require('../models/tags');



//router.get('/insumos/nuevo', Insumos.create);
//router.post('/insumos/nuevo', Insumos.doCreate);
router.post('/insumos/edit', Insumos.edit);
router.get('/insumos/delete/:id', Insumos.delete);
router.post('/insumos/tags', Tags.create, Insumos.edit);
router.get('/insumos?search', Insumos.search);
/* https://stackoverflow.com/questions/26402781/nodejs-mongoose-render-two-models-from-collections
router.get('/insumos', 
	(req,res) => {
		var listaInsumos = Insumos.find(Insumos.makekey(req,res));
		var listaTags = Tags.find({});
		var listaVars = { 
				insumos: listaInsumos.exec.bind(listaInsumos),
				tags: listaTags.exec.bind(listaTags),
		};
	 	
		async.parallel(listaVars, (err,listado) => {
	        if(err) {
		        res.render('insumos.hbs',listado);
        	} else {
				res.status(500).send(err);
    		}
		});
	}
);
*/
router.get('/insumos', (req, res) => {
    Insumos.find(function (err, insumos) {
        Tags.find(function (err, tags) {
			console.log(tags);
            res.render('insumos', {
				title: 'Insumos',
                insumos : insumos,
                tags : tags
            });
        });
    });
});

router.get('/tags/delete/:id', Tags.delete);
router.post('/tags', Tags.create);
router.get('/tags', Tags.list);


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
