const express = require('express');
const router = express.Router();
const articulo = require('../models/Articulo');
const multer = require('multer');
const storage = multer.diskStorage({
    filename: (req, file, cb) =>{
        destination:'./public/img',
        cb(null,file.originalname);
    }
});
router.get('/articulos/view-articulo', ((req, res) =>
    res.render('articulos/view-articulo')))

router.use(multer({
    storage:storage,
    dest : 'src/public/img'
}).single('imagen'));

router.get('/articulos/new-articulo', ((req, res) =>
    res.render('articulos/new-articulo')))

router.post('/articulos/articulo-guardado',async (req,res)=>{
    const {nombre, precio, marca, descripcion, categoria} = req.body;
    const errors = [];
    if(!nombre){
        errors.push({text: 'Por favor escribe un nombre'});
    }
    if(!precio){
        errors.push({text: 'Por favor escribe un precio'});
    }
    if(!marca){
        errors.push({text: 'Por favor escribe una marca'});
    }
    if(!descripcion){
        errors.push({text: 'Por favor escribe una descripcion'});
    }
    if(errors.length > 0){
        res.render('articulos/new-articulo',{
            errors,
            nombre,
            precio,
            marca,
            descripcion
        });
    }
    else{

        if(req.file){
            //res.json(req.file);
            //const {filename} = req.file.filename;
            console.log(req.file);
        }
        else{
            errors.push({text: 'Por favor escoge una imagen.'})
        }
        //const newArticulo = new articulo({nombre, descripcion, marca, precio, categoria, filename});
        //await newArticulo.save();
        //console.log(newArticulo);
        res.redirect('/');
    }
});
module.exports = router;