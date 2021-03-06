const mongoose = require('mongoose');
const {ObjectId} = require("bson");
const {Schema} = mongoose;



const PedidoSchema = new Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    idusuario: {type: ObjectId, required: true, ref: 'Usuario'},
    idarticulo:{type: [ObjectId], required: true, ref:'Articulo'},
    fecha: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Pedido', Pedido);
