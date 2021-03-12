const express = require('express');
const router = express.Router();
const Articulo = require('../models/Articulo');
const multer = require('multer');

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        destination:'img',
            cb(null, file.originalname);
    }
});
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


router.post('/articulos/articulo-guardado', async (req, res) => {
    const {nombre, precio, marca, descripcion, categoria, imagen} = req.body;
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
    if (!imagen) {
        errors.push({text: 'Por favor selecciona una imagen.'});
    }
    if (errors.length > 0) {
        res.render('articulos/new-articulo', {
            errors,
            nombre,
            precio,
            marca,
            descripcion
        });
    } else {

        if (req.file) {
            //res.json(req.file);
            //const {filename} = req.file.filename;
            console.log(imagen.filename);
        }
        //const newArticulo = new Articulo({nombre, descripcion, marca, precio, categoria, filename});
        //await newArticulo.save();
        //console.log(newArticulo);
        console.log(imagen.path);
        res.redirect('/');
    }
});
module.exports = router;