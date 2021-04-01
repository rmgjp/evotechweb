const express = require('express');
const router = express.Router();
const Articulo = require('../models/Articulo');
const multer = require('multer');
const path = require('path');
const {isAuthenticated} = require('../helpers/auth');
const {hasAutorization} = require('../helpers/auth');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/img'),
    filename : (req,file,cb)=>{
        cb(null,file.originalname);
    }
});

const load = (multer({
    storage : storage
}));


router.get('/articulos/view-articulo', ((req, res) =>
    res.render('articulos/view-articulo')))

router.get('/productos', async (req, res) => {
    const articulos = await Articulo.find().lean();
    res.render('articulos/all-articulos', {articulos});
});

router.get('/productos/:categoria', async (req, res) => {
    const articulos = await Articulo.find({categoria:req.params.categoria}).lean();
    res.render('articulos/all-articulos', {articulos});
});

router.get('/editar', hasAutorization, async (req, res) => {
    const articulos = await Articulo.find().lean();
    res.render('articulos/lista-articulos', {articulos});
});

router.get('/producto/:id', async (req, res) => {
    const producto = await Articulo.findById(req.params.id).lean();
    const articulos = await Articulo.find({categoria:producto.categoria}).limit(4).lean();
    res.render('articulos/view-articulo', {producto, articulos});
});

router.get('/editar/producto/:id', isAuthenticated ,async (req, res) => {
    const producto = await Articulo.findById(req.params.id).lean();
    res.render('articulos/editar-articulo', {producto});
});

router.put('/articulos/articulo-editado/:id', async (req, res) =>{
    const {nombre, descripcion, marca, categoria, precio} = req.body;
    console.log({nombre, descripcion, marca, categoria, precio});
    await Articulo.findByIdAndUpdate(req.params.id ,{nombre, descripcion, marca, categoria, precio});
    res.redirect('/editar');
});
//ruta para borrar articulo
router.delete('/articulo/delete/:id', async (req,res)=>{
    await Articulo.findByIdAndDelete(req.params.id);
    res.redirect('/editar');
    console.log("Ok");
});
router.get('/articulos/new-articulo', isAuthenticated, ((req, res) =>
    res.render('articulos/new-articulo')));


router.post('/articulos/new-articulo', load.single('foto'), async (req, res ) => {
    const {nombre, precio, marca, descripcion, categoria, foto} = req.body;

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
        const newArticulo = new Articulo();
        newArticulo.nombre = req.body.nombre;
        newArticulo.precio = "MXN$" + req.body.precio;
        newArticulo.marca = req.body.marca;
        newArticulo.descripcion = req.body.descripcion;
        newArticulo.categoria = req.body.categoria;
        let file = req.file;
        let pathArchivo = 'img/'+ file.originalname.toString();
        newArticulo.imagen = pathArchivo;
        await newArticulo.save();
        //console.log(newArticulo);
        res.render('articulos/new-articulo');
    }
});
module.exports = router;