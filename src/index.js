const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const { mainModule } = require("process");
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');


//inicializaciones
const app = express();



require('./database');
require('./config/passport');
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))



//settings
app.set('port',process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));




app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.set('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    helpers: require('./helpers/helperhbs'),
    extname: '.hbs'
}));



app.set('view engine', '.hbs');
//middlewares
app.use(express.urlencoded({extended : false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



//Global variables
app.use((req, res, next) =>{
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    next();
});


//Routes

//mas rutas...
app.use(require('./routes/index'));
//app.use(require('./img/'));
app.use(require('./routes/users'));
app.use(require('./routes/articulos'));
//app.use(require('./routes/direcciones'));

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Server is listening
app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
} );