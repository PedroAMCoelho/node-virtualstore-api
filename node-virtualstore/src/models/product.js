'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema é uma linguagem para definição de regras de validação ("esquemas"). Recomendação por parte do W3C.
const schema = new Schema({
    // o schema vai criar um item antes de tudo (o _id)
    title: {
        type: String,
        required: true,
        trim: true //vai remover os espaços antes de depois do titulo
    },
    slug: { //slug é o q vai compor a URL do produto. Ex: tile Cadeira Gamer = cadeira-gamer. O slug vai ser unico
        type: String,
        required: [true, 'O slug é obrigatório'],
        trim: true,
        index: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    tags: [{
        type: String,
        required: true
    }]//,
    //image: {
       // type: String,
       // required: true,
        //trim: true
    //}
});

module.exports = mongoose.model('Product', schema); //Product é o nome do model, dado agora
