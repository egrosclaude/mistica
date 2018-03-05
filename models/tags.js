// tags

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tagsSchema = Schema({
	nombre: { type:String, required:true, unique:true },
});

var Tags = mongoose.model('Tag', tagsSchema, 'tags');

Tags.list = (req,res) => {
	var key = {};
	if(req.query.search) {
		const k = new RegExp(req.query.search, "i");
		key = { nombre: k };
	};
	var tags;
	Tags.find(key, 
		function(err, tags) {
	    	if (err) {throw err;} 
		}
	).sort('nombre');
	return tags;
};


Tags.create = (req, res, next) => {
	if(req.body.nuevotag) {
		new Tags({ nombre: req.body.nuevotag }).save( 
			(err, tag) => {
				if(!err) { 
					console.log("Tag creado", tag); 
				} else {throw err;} 
		});
	}
	next();
};


Tags.delete = (req,res) => {
	//console.log(req.params);
	Tags.findByIdAndRemove(req.params.id, (err) => {
		if(!err) {
		//			res.redirect('/insumos');
		}
	});
};

module.exports = Tags;
