// propiedades

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var propiedadesSchema = Schema({
	nombre: { type:String, required:true },
});

var Propiedades = mongoose.model('propiedades', propiedadesSchema);
module.exports = Propiedades;
