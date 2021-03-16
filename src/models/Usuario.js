const mongoose = require('mongoose');
const {Schema} = mongoose;

const UsuarioSchema = new Schema({

    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    correo: {type: String, required: true},
    password: {type: String, required: true},
    numero: {type: String, required: true},
    calle: {type: String, required: true},
    colonia: {type: String, required: true},
    cp: {type: String, required: true},
    ciudad: {type: String, required: true},
    estado: {type: String, required: true}
});

module.exports = mongoose.model('Usuario', UsuarioSchema);