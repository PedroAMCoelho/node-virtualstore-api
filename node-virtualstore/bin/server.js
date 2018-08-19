'use strict' //força a ser mais criterioso, n pode esquecer ; etc

//importação dos módulos - require
const app = require('../src/app'); // importa/referencia a app la do app.js
const http = require('http'); //tá buscando o http na pasta node_modules
const debug = require('debug')('nodestr:server');

//const port = 3000;
const port = normalizePort(process.env.PORT || '3000'); //o process.env.PORT é pq se tiver rodando no azure, ele ja distribui a porta
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

console.log('API rodando na porta ' + port);

function normalizePort(val)
{
    const port = parseInt(val, 10); // tenta converter val para int

    if(isNaN(port)) //se n for numero
    {
        return val; //retorna 10
    }

    if(port >= 0)
    {
        return port;
    }

    return false;
}

function onError(error) //recebe possivel erro do servidor --- tratamento de erros
{
    if(error.syscall !== 'listen')
    {
        throw error;
    }

    const bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port' + port;

    switch (error.code)
    {
        case 'EACCES': // erro de permissão?
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE': //erro de endereço em uso?
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() //debug
{
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe' + addr
        : 'port' + addr.port;
    debug('Listening on ' + bind);
}
