const express = require('express');
const router = express.Router();
const direccion = require('../models/Direccion');

router.get('/direcciones', (req, res) => {
    res.render('direcciones/new-direccion')
})

router.post('/direcciones/dir', async (req,res)=>{
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
        const newDireccion = new direccion({numero,calle,colonia, cp,ciudad,estado});
        await newDireccion.save();
        console.log(newDireccion);
        res.redirect('/');
    }
});
module.exports = router;