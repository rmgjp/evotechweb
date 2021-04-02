const helpers = {};

helpers.isAuthenticated = (req,res,next) =>{
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash("error_msg", "No ha iniciado sesión.");
        res.redirect('/signin');
    }
};

helpers.hasAutorization = (req,res,next) =>{
    if (req.isAuthenticated() && (req.user.email === 'admin@evotech.com')) {
        return next();
    }
    return res.redirect(403, "/error");
}
module.exports = helpers;