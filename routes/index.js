const express = require('express');
const router = express.Router()
const clientesController = require('../controllers/clientesController')
const ccController = require('../controllers/cuentaController');
const usuariosController = require('../controllers/usuariosController');
const auth = require('../Middleware/Auth')


module.exports = function(){
    router.get('/')

    //clientes
    router.post('/clientes', auth, clientesController.nuevoCliente);
    router.get('/clientes', auth, clientesController.mostrarClientes);
    router.get('/clientes/:idCliente', auth, clientesController.mostrarCliente);
    router.put('/clientes/:idCliente', auth, clientesController.editarCliente);
    router.delete('/clientes/:idCliente',auth, clientesController.borrarCliente);

   
    //cuentascorrientes
    router.post('/cc',auth, ccController.nuevaCC)
    router.get('/cc', ccController.mostrarCCS)
    
    router.get('/ccs', ccController.ccc)
    router.get('/ccs/:idCliente', ccController.cuentaxcliente)
    router.get('/totcliente/:idCliente', ccController.totCliente)
    router.get('/cc/:idCC', ccController.mostrarCC)
    router.put('/cc/:idCC',auth, ccController.editarCC)
    router.delete('/cc/:idCC',auth, ccController.borrarCC)

    router.post('/crear-cuenta', usuariosController.registrar)
    router.post('/iniciar-sesion', usuariosController.iniciar)


    router.get('/movimientoparacliente/:email', ccController.movimientosparaclientes)




    return router;
}
