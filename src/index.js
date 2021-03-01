const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const { mainModule } = require("process");
const methodOverride = require('method-override');
const session = require('express-session');

//inicializaciones
const app = express();
require('./database');
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
//Global variables

//Routes

//mas rutas...
app.use(require('./routes/index'));
//app.use(require('./img/'));
app.use(require('./routes/users'));
app.use(require('./routes/pagos'));
app.use(require('./routes/articulos'));
app.use(require('./routes/direcciones'));

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Server is listening
app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
} );