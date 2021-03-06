const mongoose = require('mongoose');
const {Schema} = mongoose;

const ExistenciaSchema = new Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    cdArticulo :  {type: Schema.ObjectId, ref:"Articulo"},
    cantidad :{type: Integer, required:true}
});

module.exports = mongoose.model('Existencia', ExistenciaSchema);
