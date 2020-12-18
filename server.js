/*en caso de  hacer uso con el directorio controlador se 
debe importar como se observa en la siguiente linea, con el nombre del archivo js
que contiene la logica */
//const controller = require('./controller/nombredelcontrollador.js');
const express = require('express');
const morgan = require('morgan');
const apiRouter = require('./routes/api/index.js');
const db = require('./models');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
const controller = require('./controllers/UserController.js');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    next();
});


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.set('PORT', process.env.PORT || 3000);

app.get('/', function(req,res){
    console.log("Estructura base del proyecto backend");
    res.send("Estructura base del proyecto backend");
});

app.get('/api/users', (req, res) => {
    db.user.findAll().then(users => res.json(users))
});

app.post('/api/auth/signin', controller.signin);


app.listen(app.get('PORT'), () => {
    console.log(`Running on http://localhost:${app.get('PORT')}`)
});

module.exports = app;