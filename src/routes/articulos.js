const express = require('express');
const router = express.Router();
const usuario = require('../models/Articulo');

router.get('/articulos/view-articulo', ((req, res) =>
    res.render('articulos/view-articulo')))

router.get('/articulos/articulo-guardado', ((req, res) =>
    res.render('articulos/articulo-guardado')))

router.get('/articulos/new-articulo', ((req, res) =>
    res.render('articulos/new-articulo')))

router.post('/articulos/ArticuloGuardado', async (req, res) =>
    {
        const {nombre,marca,descripcion,precio} = req.body;
        const errors = [];
        if(!nombre){
            errors.push({text: 'Por favor escribe un nombre'});
        }
        if(!marca){
            errors.push({text: 'Por favor escribe una marca'});
        }
        if(!descripcion){
            errors.push({text: 'Por favor escribe una descripcion'});
        }
        if(!precio){
            errors.push({text: 'Por favor escribe un precio'});
        }

        if(errors.length > 0){
            res.render('/articulos/new-articulo',{
                errors,
                nombre,
                marca,
                descripcion,
                precio
            });
        }
        else{
            const newArticulos = new usuario({nombre,descripcion,marca, precio});
            await newArticulos.save();
            console.log(newUsuario);
            res.redirect('/articulos/articulo-guardado');
        }
    }
);

module.exports = router;