const mongoose = require('mongoose');
const {ObjectId} = require("bson");
const {Schema} = mongoose;



const DireccionSchema = new Schema({


});

module.exports = mongoose.model('Direccion', DireccionSchema);
