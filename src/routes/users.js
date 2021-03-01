const express = require('express');
const router = express.Router();

router.get('/users/signin', ((req, res) =>
            res.send('Ingresando')));

router.get('/users/signup', ((req, res) =>
    res.send('Autenticando')));

module.exports = router;