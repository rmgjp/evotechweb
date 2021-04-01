const express = require('express');
const router = express.Router();
const Articulo = require('../models/Articulo');

router.get('/', async (req, res) => {
    const articulos = await Articulo.find().limit(8).lean()
    res.render('Index', {articulos})
});

router.get('/about', (req, res) => {
    res.render('About')
});

module.exports = router;