const mongoose = require('mongoose');
const {Schema} = mongoose;

const ArticuloSchema = new Schema({
    //id: mongoose.Schema.Types.ObjectId,
    nombre : {type: String, required: true},
    descripcion: {type: String, required : true},
    marca : {type:String, required:true},
    categoria: {type:String, required: true},
    precio :{type:String, required: true},
    foto:{type:String, required:true}
});

module.exports = mongoose.model('Articulo', ArticuloSchema);