const express = require('express');
const router = express.Router();

router.get('/articulos/view-articulo', ((req, res) =>
res.render('articulos/view-articulo')))

router.get('/articulos/new-articulo', ((req, res) =>
    res.render('articulos/new-articulo')))

module.exports = router;