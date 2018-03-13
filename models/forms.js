// forms

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var formsSchema = Schema({
	nombre: { type:String, required:true },
	creadoEn: Date,
});

var Forms = mongoose.model('Form', formsSchema, 'forms');
/*
Forms.makekey = (req, res) => {
	var key = {};
	if(req.query.search) {
		const k = new RegExp(req.query.search, "i");
		key = { nombre: k };
	};
	return key;
};
*/

var Tags = require('../models/tags');


Forms.list = (req,res) => {
	console.log("forms.list");
	Forms.find({},
			function (err, forms) {
        Tags.find(function (err, tags) {
			//console.log(tags);
            res.render('forms', {
				title: 'Forms',
                forms : forms,
                tags : tags
            });
        });
    }).sort('nombre');
};

/*
Arts.tags = (req,res,next) => {

	console.log('Grabando tags de art', req.body);
	next();
};


Arts.delete = (req,res,next) => {
	console.log("delete: ", req.params);
	Arts.findByIdAndRemove(req.params.id, (err) => {
		if(err) {
			console.log("error en borrado");
		}
	});
	res.redirect('/arts');
};

Arts.nuevo = (req,res,next) => {
	console.log("nuevo: ", req.params);

	Arts.findOne({
		_id: req.params.id
	}, (err, art) => {
		if(!err) {
			new Arts({
				nombre: art.nombre,
				unidades: art.unidades,
				costo: art.costo, 
				tamano: art.tamano,
				creadoEn: Date.now(),
				modificadoEn: Date.now()
			}).save( (err, art) => {
				if(!err) { 
					console.log("Art creado", art); 		
				} else {
					console.log("error: ", err);
				}
				res.redirect('/arts');
			});
	  	};
	});
};


Arts.edit = (req,res) => {
	console.log("edit: ", req.params);
	Arts.findOne({
		_id : req.params.id
		}, (err, art) => {
			console.log(art);
			if(!err) {
				art.nombre = req.body.nombre;
				art.unidades = req.body.unidades;				
				art.costo = req.body.costo;
				art.tamano = req.body.tamano;

				art.save(function(err, art){
					console.log('Saved:', art);
					res.redirect('/arts');
				});
			}
		}
	);

};
*/
module.exports = Forms;
