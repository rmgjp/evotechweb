const express = require('express');
const router = express.Router();
const usuario = require('../models/Usuario');

router.get('/users/signin', ((req, res) =>
            res.render('users/signin')));

router.get('/users/account', ((req, res) =>
    res.render('users/account')));

router.post('/users/update', async (req, res) =>{

});

router.post('/users/Registro', async (req,res)=>{
    const {nombre,apellido,correo,password, password2} = req.body;
    const errors = [];
    if(!nombre){
        errors.push({text: 'Por favor escribe un nombre'});
    }
    if(!apellido){
        errors.push({text: 'Por favor escribe un apellido'});
    }
    if(!correo){
        errors.push({text: 'Por favor escribe un correo'});
    }
    if(!password){
        errors.push({text: 'Por favor escribe una contraseña'});
    }
    if(!password2){
        errors.push({text: 'Por favor confirma la contraseña'});
    }
    if(password !== password2){
        errors.push({text: 'Las contraseñas no coinciden'});
    }
    if(errors.length > 0){
        res.render('users/signup',{
           errors,
           nombre,
           apellido,
           correo
        });
    }
    else{
        const newUsuario = new usuario({nombre,apellido,correo, password});
        await newUsuario.save();
        console.log(newUsuario);
        res.redirect('/');
    }
});
router.get('/users/signup', ((req, res) =>
    res.render('users/signup')));

module.exports = router;