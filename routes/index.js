var express = require('express');
var router = express.Router();



router.get('/insumos', function(req, res) {
  console.log('estoy en insumos');

   res.render('insumos.hbs'); 
});


router.get('/recetas', function(req, res) {
  console.log('estoy en recetas');
  res.render('recetas.hbs', { title: 'Recetas', mensaje: 'Esta es la lista de recetas' });
  
});


router.get('/productos', function(req, res) {
  console.log('estoy en productos');
  res.render('productos.hbs', { title: 'Productos', mensaje: 'Esta es la lista de productos' });
  
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Mística', mensaje: 'A verga' });
});
 
module.exports = router; 
