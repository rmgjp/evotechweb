const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../models/Usuario');


passport.use(new LocalStrategy({
    usernameField: 'email',
},
    async (email,password,done)=>{
     const user = await Usuario.findOne({email: email});
     if (!user)
     {
         return done(null, false,{mensaje: "Usuario no encontrado"});
         console.log("Usuario no encontrado")
     }
     else {
         const match = await user.matchPassword(password);
         if(email == "admin@evotech.com"){
             if(match){
                 const admin = true;
                 console.log('Rol admin')

                 return done(null,user, admin);
             }
             else{
                 return done(null, false,{mensaje: "Contraseña invalida"});
                 console.log("Contraseña invalida")
             }
         }
         else {
             if(match){
                 console.log('Rol user')
                 return done(null,user);
             }
             else{
                 return done(null, false,{mensaje: "Contraseña invalida"});
                 console.log("Contraseña invalida")
             }
         }

     }
}));
passport.serializeUser((user,done) =>{
    done(null,user.id);
});
passport.deserializeUser((id,done)=>{
   Usuario.findById(id,(err,user)=>{
       done(err,user);
   }).lean();
});

