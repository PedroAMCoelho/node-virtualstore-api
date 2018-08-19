'use strict';

//instanciar
const express = require('express'); //poderia ter um path no lugar do express, p. ex
const router = express.Router(); //URL p usuario conseguir chegar ate nossa app
const controller = require('../controllers/product-controller');

//GET: http://localhost:3000/products/
router.get('/', controller.get);

//GET: http://localhost:3000/products/{{slug}}
router.get('/:slug', controller.getBySlug); //chamei o parâmetro de slug aqui e, lá no product-controller, tem q fz o bind no getBySlug - tem q ser slug lá no req.params.SLUG <--

//GET: http://localhost:3000/products/admin/{{id}}
router.get('/admin/:id', controller.getById); // o /admin/ é só pra mudar a sintaxe da rota, pra n ter conflito com a do slug

//GET: http://localhost:3000/products/tags/{{tag}}
router.get('/tags/:tag', controller.getByTag);

//POST: http://localhost:3000/products/
router.post('/', controller.post);

//PUT: http://localhost:3000/products/123
router.put('/:id', controller.put);

//DELETE: http://localhost:3000/products/
router.delete('/', controller.delete);

module.exports = router;