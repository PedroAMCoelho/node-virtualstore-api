'use strict';

const express = require('express'); //poderia ter um path no lugar do express, p. ex
const router = express.Router(); //URL p usuario conseguir chegar ate nossa app

//API: http://localhost:3000/
router.get('/', (req, res, next) => { // a port vai cair ali no '/'
    res.status(200).send({
        title: "Node Store API",
        version: "0.0.1"
    });
});

module.exports = router;