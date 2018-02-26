// insumos

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var insumosSchema = Schema({
	nombre: { type:String, required:true, unique:true },
	unidades: String,
	costo: Number,
	creadoEn: Date,
	modificadoEn: { type: Date, default: Date.now },
	tags: [{ type:Schema.ObjectId, ref:'Tags'}],
});

var Insumos = mongoose.model('Insumo', insumosSchema, 'insumos');

Insumos.makekey = (req, res) => {
	var key = {};
	if(req.query.search) {
		const k = new RegExp(req.query.search, "i");
		key = { nombre: k };
	};
	return key;
};


Insumos.list = (req,res) => {
	var ins;
	Insumos.find(Insumos.makekey(req,res), 
		function(err, insumos) {
	    	if (!err) { 
				ins = insumos;
			} else { throw err; }
		}
	).sort('nombre');
	return ins;
};


Insumos.tags = (req,res,next) => {

	console.log('Grabando tags de art', req.body);
	next();
};

Insumos.search = (req,res,next) => {
	console.log(req.params);
	next();
};

/*
const nuevoInsumo = (req,res,next) => {
	console.log('RECIBIDO insumos/nuevo',req.body);
	var newInsumo = new Insumos(req.body).save(function(err) {
		if(!err) {
			console.log('insumo grabado');
			next();
		}
	});
};
*/
/*
exports.doCreate = (req, res) => {
	new Insumos({
		nombre: req.body.nombre,
		unidades: req.body.unidades,
		costo: req.body.costo,
		creadoEn : Date.now(),
		modificadoEn : Date.now(),
	}).save( (err, insumo) => {
		if(!err) { console.log("Insumo creado", insumo); }
	});
};
*/

Insumos.delete = (req,res) => {
	console.log(req.params);
	Insumos.findByIdAndRemove(req.params.id, (err) => {
		if(!err) {
			res.redirect('/insumos');
		}
	});
};

Insumos.edit = (req,res) => {
	Insumos.findOne({
		_id : req.body.id
		}, (err, insumo) => {
			console.log(insumo);
			if(!err) {
				insumo.nombre = req.body.nombre;
				insumo.unidades = req.body.unidades;				
				insumo.costo = req.body.costo;

				insumo.save(function(err, insumo){
					console.log('Saved:', insumo);
					res.redirect('/insumos');
				});
			}
		}
	);

};

module.exports = Insumos;
