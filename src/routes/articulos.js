const express = require('express');
const router = express.Router();
const Articulo = require('../models/Articulo');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/img'),
    filename : (req,file,cb)=>{
        cb(null,file.originalname);
    }
});
const load = (multer({
    storage : storage
}).single('foto'));

router.get('/articulos/view-articulo', ((req, res) =>
    res.render('articulos/view-articulo')))

router.get('/productos', async (req, res) => {
    const articulos = await Articulo.find().lean();
    res.render('articulos/all-articulos', {articulos});
});

router.get('/producto/:id', async (req, res) => {
    const producto = await Articulo.findById(req.params.id).lean();
    res.render('articulos/view-articulo', {producto});
});

router.use(multer({
    storage,
    dest: 'img'
}).single('imagen'));

router.get('/articulos/new-articulo', ((req, res) =>
    res.render('articulos/new-articulo')));


router.post('/articulos/articulo-guardado', load ,async (req, res) => {
    const {nombre, precio, marca, descripcion, categoria,foto} = req.body;

    const errors = [];

    if (!nombre) {
        errors.push({text: 'Por favor escribe un nombre.'});
    }
    if (!precio) {
        errors.push({text: 'Por favor escribe un precio.'});
    }
    if (!marca) {
        errors.push({text: 'Por favor escribe una marca.'});
    }
    if (!descripcion) {
        errors.push({text: 'Por favor escribe una descripcion.'});
    }
    //if (!foto) {
    //  errors.push({text: 'Por favor selecciona una imagen.'});
    //}
    if (errors.length > 0) {
        res.render('articulos/new-articulo', {
            errors,
            nombre,
            precio,
            marca,
            descripcion
        });
    } else {
        let fotoString = await String(path.join('..', 'public', 'img', req.file.originalname));
        console.log(fotoString);
        const newArticulo = new Articulo({nombre, descripcion, marca, categoria, precio, fotoString});
        //await newArticulo.save();
        console.log(newArticulo);
        res.render('articulos/new-articulo');
    }
});
module.exports = router;