// arts

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var artsSchema = Schema({
	nombre: { type:String, required:true, unique:true },
	tamano: Number,
	unidades: String,
	costo: Number,
	creadoEn: Date,
	modificadoEn: { type: Date, default: Date.now },
	tags: [{ type:Schema.ObjectId, ref:'Tags'}],
});

var Arts = mongoose.model('Art', artsSchema, 'arts');

Arts.makekey = (req, res) => {
	var key = {};
	if(req.query.search) {
		const k = new RegExp(req.query.search, "i");
		key = { nombre: k };
	};
	return key;
};

var Tags = require('../models/tags');

Arts.list = (req,res) => {
	console.log("arts.list");
	Arts.find(Arts.makekey(req,res),
			function (err, arts) {
        Tags.find(function (err, tags) {
			//console.log(tags);
            res.render('arts', {
				title: 'Arts',
                arts : arts,
                tags : tags
            });
        });
    }).sort('nombre');
};

Arts.tags = (req,res,next) => {

	console.log('Grabando tags de art', req.body);
	next();
};


/*
const nuevoArt = (req,res,next) => {
	console.log('RECIBIDO arts/nuevo',req.body);
	var newArt = new Arts(req.body).save(function(err) {
		if(!err) {
			console.log('art grabado');
			next();
		}
	});
};
*/
/*
exports.doCreate = (req, res) => {
	new Arts({
		nombre: req.body.nombre,
		unidades: req.body.unidades,
		costo: req.body.costo,
		creadoEn : Date.now(),
		modificadoEn : Date.now(),
	}).save( (err, art) => {
		if(!err) { console.log("Art creado", art); }
	});
};
*/

Arts.delete = (req,res) => {
	console.log("delete: ", req.params);
	Arts.findByIdAndRemove(req.params.id, (err) => {
		if(!err) {
			res.redirect('/arts');
		}
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

module.exports = Arts;
