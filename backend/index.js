const express = require('express');
const mongoose = require('mongoose');
const db_mongoose = require('./config/db_mongoose');
const routes = require('./routers/route');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(session({
    secret: 'secret',
    cookie: { maxAge: 300*60*1000 },
    resave: false,
    saveUninitialized: true
}));

mongoose.connect(db_mongoose.connection).then(() => {
    console.log('Conectado');
}).catch(() => {
    console.log('Erro de conexão com o banco de dados');
});

app.use(routes);

app.listen(8081, function(){
    console.log("Servidor rodando na url http://localhost:8081");
});