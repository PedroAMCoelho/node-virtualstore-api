'use strict';

//importar mongoose
const mongoose = require('mongoose');

//importar Product criado lá no Models
const Product = mongoose.model('Product');

/*
//listar os produtos - antes do async await
exports.get = () => {
    return Product //o -_id abaixo retira o id da listagem dos campos do produto
        .find({ active: true }, '-_id title price slug');
} */

exports.get = async() => {
    const res = await Product.find({
        active: true
    }, 'title price slug'); //(filtros, campos a serem exibidos) Passa no 2o parametro todas as props q deseja exibir no get (só serão exibidos produtos ativos)
    return res;
}

exports.getBySlug = (slug) => {
    return Product // isso aqui puxa do banco
        .findOne({
            active: true, // findOne é pra não vir como Array, mas sim como um objeto só
            slug: slug //filtro pela slug q for passada na URL
        }, '-_id title description price slug tags');
}

exports.getById = (id) => {
    return Product // isso aqui puxa do banco
        .findById(id); // findById é especifico pro id //filtro pelo id q for passado na URL                            
}

exports.getByTag = (tag) => {
    return Product // isso aqui puxa do banco
        .find({
            tags: tag, //filtro pela tag q for passada na URL. Isso aqui é especial, filtra no Array do Mongoose, qual produto tem a tag
            active: true
        }, 'title description price slug tags');
}

exports.create = (body) => {

    //instancia o produto, já passando o req.body
    var product = new Product(body);
    //poderia ser assim tbm, ao inves de passar o req.body como parametro:
    //exemplo: product.title = req.body.title;

    return product.save(); //pra salvar no banco
}

exports.update = (id, bodyData) => {
   return Product
        .findByIdAndUpdate(id, { //findbyidandupdate é metodo do mongo. Poderia ser simplesmente alterando os atributos e metendo um save() no fim...
            $set: {//dentro do cifrao set vc setta como novos valores dos atributos tudo q foi passado no body da requisicao
                title: bodyData.title,
                description: bodyData.description,
                price: bodyData.price,
                slug: bodyData.slug,
                tags: bodyData.tags
            }
        });
}

exports.delete = (id) => {
    return Product
        .findByIdAndRemove(id);
}