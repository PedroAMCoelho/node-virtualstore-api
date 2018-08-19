'use strict';

//importar mongoose
const mongoose = require('mongoose');

//importar Product criado lá no Models
const Product = mongoose.model('Product');

//importar o contrato / validacoes
const ValidationContract = require('../validators/validation-contract');

//importar o repositório
const repository = require('../repositories/product-repository');

/*
//listar os produtos - Sem ASYNC e AWAIT
exports.get = (req, res, next) => {
    repository
    .get() // esse metodo n passa parametros lá pro .get, em product-repository
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });
}
*/

//listar os produtos
exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

//listar os produtos pelo slug
exports.getBySlug = (req, res, next) => {
    repository
    .getBySlug(req.params.slug) //o param aqui corresponde ao param "slug" lá no método .getBySlug, em product-repository 
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });

}

//listar os produtos pelo id
exports.getById = (req, res, next) => {
    repository
    .getById(req.params.id) //o param aqui corresponde ao param "id" lá no método .getById, em product-repository        
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });
}

//listar os produtos pela tag
exports.getByTag = (req, res, next) => {
    repository
    .getByTag(req.params.tag) //o param aqui corresponde ao param "tag" lá no método .getByTag, em product-repository
    .then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });
}

//esse controller vai ser refenciado lá nas rotas
exports.post = (req, res, next) => {

    //validações do contrato
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    repository
    .create(req.body) ////o param aqui corresponde ao param "body" lá no método .create, em product-repository
    .then(x => {
        res.status(201).send({message: 'Produto cadastrado com sucesso!'});
    })
    .catch(e => {
        res.status(400).send({message: 'Falha ao cadastrar o produto!', data: e});
    });
   
    //201 = created; 400 = bad request; 401 = nao autenticado; 403 = acesso negado; 500 = internal sv error
};

/** exports.put = (req, res, next) => {
    const id = req.params.id; //aqui recupera parametros q vem pela URL
    res.status(200).send({
        id: id,
        item: req.body
    }); //resposta    
}; **/

exports.put = (req, res, next) => {
    repository
    .update(req.params.id, req.body)
    .then(x => {
            res.status(201).send({
                message: 'Produto atualizado com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao atualizar produto',
                data: e
            });
        });
};

/**exports.delete = (req, res, next) => {
    res.status(200).send(req.body); //resposta    
}; **/

exports.delete = (req, res, next) => {
    repository
        .delete(req.body.id)
        .then(x => { //poderia ser direto na URL - req.params.id // teria q add /:id la na rota do delete
            res.status(200).send({
                message: 'Produto removido com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Falha ao remover o produto',
                data: e
            });
        });
};