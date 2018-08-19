
const express = require('express'); //poderia ter um path no lugar do express, p. ex
const bodyParser = require('body-parser'); //especie de middleware, p/ todo request q vier, passar por ele, e ter seu corpo convertido pra json
const mongoose = require('mongoose');


const app = express(); //referente ao const express
const router = express.Router(); //URL p usuario conseguir chegar ate nossa app

//Conecta ao banco
mongoose.connect('connectionstring');

//Carrega os Models
const Product = require('./models/product');

//Carrega as rotas
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route'); // essa importação aqui inclui o put e o delete já


app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
    {
        extended: false
    }));//tem essa opcao ao json tb. há outras opcoes no bodyarser tbm, como determinar tamanho max da requisicao, etc
        
app.use('/', indexRoute); //rota rodando -- atribuimos a rota ao app
app.use('/products', productRoute);
        
module.exports = app; //exportar nossa aplicação -- manda o app para a classe que importa (no caso, server.js ta importando pelo require('../src/app');)