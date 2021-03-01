const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/evotechdb', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
    .then(db => console.log('Conectado'))
    .catch(err => console.log(err));