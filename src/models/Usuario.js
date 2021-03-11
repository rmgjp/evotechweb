const mongoose = require('mongoose');
const {Schema} = mongoose;

const UsuarioSchema = new Schema({

    nombre : {type: String, required: true},
    apellido: {type: String, required : true},
    correo:{type:String, required:true},
    password: {type: String, required: true}
});

module.exports = mongoose.model('Usuario', UsuarioSchema);