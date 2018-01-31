// insumos

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var insumosSchema = Schema({
	nombre: { type:String, required:true, unique:true },
	unidades: String,
	costo: Number,
	creadoEn: Date,
	modificadoEn: { type: Date, default: Date.now },
	propiedades: [{ type:Schema.ObjectId, ref:'Propiedades'}],
});

//customerSchema.methods.getOrders = function(){
//return Orders.find({ customerId: this._id });
//};

insumosSchema.methods.getInsumo = () => {
};



var Insumos = mongoose.model('insumos', insumosSchema);
module.exports = Insumos;
