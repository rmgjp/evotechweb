const mongoose = require('mongoose');
const {ObjectId} = require("bson");
const {Schema} = mongoose;



const DireccionSchema = new Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    //idUsuario: {type: ObjectId, required: true, ref: 'Usuario'},
    numero:{type: String, required:true},
    calle: {type: String, required: true},
    colonia: {type: String, required: true},
    cp: {type: String, required: true},
    ciudad: {type: String, required: true},
    estado: {type: String, required: true}
});

module.exports = mongoose.model('Direccion', DireccionSchema);
