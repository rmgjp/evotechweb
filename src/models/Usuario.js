const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const {Schema} = mongoose;

const UsuarioSchema = new Schema({

    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    email: {type: String, required: true, unique: true, trim: true},
    password: {type: String, required: true},
    numero: {type: String, required: true},
    calle: {type: String, required: true},
    colonia: {type: String, required: true},
    cp: {type: String, required: true},
    ciudad: {type: String, required: true},
    estado: {type: String, required: true}
},
{
    timestamps: true,
    versionKey: false,
}
);

UsuarioSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt)
    return hash;
};

UsuarioSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


module.exports = mongoose.model('Usuario', UsuarioSchema);