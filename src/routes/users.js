const express = require('express');
const router = express.Router();

router.get('/users/signin', ((req, res) =>
            res.send('Ingresando')));

router.get('/users/signup', ((req, res) =>
    res.render('users/signup')));

module.exports = router;