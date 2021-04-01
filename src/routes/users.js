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
}))


router.get('/account/:id', isAuthenticated, async (req, res) =>{
    const user = await usuario.findById(req.params.id).lean();
    res.render('users/account', {user});
});

router.put('/update/:id', async (req, res) =>{
    console.log("dentro del metodo put");
    const {nombre, apellido, correo,  numero, calle, colonia, cp, ciudad, estado, newpassword, newpassword2} = req.body;
    if(!newpassword && !newpassword2){
        await usuario.findByIdAndUpdate(req.params.id, {nombre, apellido, correo, numero, calle, colonia, cp, ciudad, estado});
        console.log("actualizando sin contraseña");
        console.log(req.body);
    }
    else{
        if(newpassword === newpassword2){
            const Usuario = new usuario;
            const password = await Usuario.encryptPassword(newpassword);
            console.log(password);
            if(await usuario.findByIdAndUpdate(req.params.id, {nombre, apellido, correo, password, numero, calle, colonia, cp, ciudad, estado})){
                console.log("se actualizó la contraseña");
            }
            console.log(req.body);
        }
    }
    res.redirect('/')
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