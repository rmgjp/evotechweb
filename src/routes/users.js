const express = require('express');
const router = express.Router();
const usuario = require('../models/Usuario');
const passport = require('passport');
const { isAuthenticated } = require('../helpers/auth');
router.get('/signin', ((req, res) =>
            res.render('users/signin')));

router.post('/signin', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true
}));

router.get('/account/:id', isAuthenticated, ((req, res) =>
    res.render('users/account')));


router.post('/update', async (req, res) =>{
});

router.post('/signup', async (req,res)=>{
    const {nombre,apellido,email,password, password2, numero, calle, colonia, cp, ciudad, estado} = req.body;
    const errors = [];
    if(!nombre){
        errors.push({text: 'Por favor escribe un nombre'});
    }
    if(!apellido){
        errors.push({text: 'Por favor escribe un apellido'});
    }
    if(!email){
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
           email
        });
    }
    else{
        const correoUsuario = await usuario.findOne({email: email});
        if(correoUsuario){
            console.log("Correo existente");
            errors.push({text: 'El correo ya esta asociado a una cuenta'});
            res.render('users/signup',{
                errors,
                nombre,
                apellido,
                email
            });
        }
        else {
            const newUsuario = new usuario({nombre, apellido, email, password, numero, calle, colonia, cp, ciudad, estado});
            newUsuario.password = await newUsuario.encryptPassword(password);
            await newUsuario.save();
            console.log(newUsuario);
            res.redirect('/signin');
        }

    }
});
router.get('/signup', ((req, res) =>
    res.render('users/signup')));
router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect("/");
});
module.exports = router;