const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

router.get('/direcciones', (req, res) => {
    res.render('direcciones/new-direccion')
});


router.post('/add-direccion/:id', async (req,res)=>{

    const usuario = await Usuario.findById(req.params.id).lean();
    const {numero,calle,colonia,cp, ciudad,estado} = req.body;
    const errors = [];
    if(!numero){
        errors.push({text: 'Por favor escribe un numero'});
    }
    if(!calle){
        errors.push({text: 'Por favor escribe una calle'});
    }
    if(!colonia){
        errors.push({text: 'Por favor escribe una colonia'});
    }
    if(!cp){
        errors.push({text: 'Por favor escribe un codigo postal'});
    }
    if(!ciudad){
        errors.push({text: 'Por favor escribe una ciudad'});
    }
    if(!estado){
        errors.push({text: 'Por favor escribe un estado'});
    }
    if(errors.length > 0){
        res.render('direcciones/new-direccion',{
            errors,
            numero,
            calle,
            colonia,
            cp,
            ciudad,
            estado
        });
    }
    else{
        //const newDireccion = new direccion({numero,calle,colonia, cp,ciudad,estado});
        //await newDireccion.save();
        console.log(req.params.id);
        res.redirect('/');
    }
});
module.exports = router;