const express = require('express');
const router = express.Router()
const clientesController = require('../controllers/clientesController')
const ccController = require('../controllers/cuentaController');



module.exports = function(){
    router.get('/')

    //clientes
    router.post('/clientes', clientesController.nuevoCliente);
    router.get('/clientes', clientesController.mostrarClientes);
    router.get('/clientes/:idCliente', clientesController.mostrarCliente);
    router.put('/clientes/:idCliente', clientesController.editarCliente);
    router.delete('/clientes/:idCliente', clientesController.borrarCliente);

   
    //cuentascorrientes
    router.post('/cc', ccController.nuevaCC)
    router.get('/cc', ccController.mostrarCCS)
    
    router.get('/ccs', ccController.ccc)
    router.get('/ccs/:idCliente', ccController.cuentaxcliente)
    router.get('/totcliente/:idCliente', ccController.totCliente)
    router.get('/cc/:idCC', ccController.mostrarCC)
    router.put('/cc/:idCC', ccController.editarCC)
    router.delete('/cc/:idCC', ccController.borrarCC)


    router.get('/movimientoparacliente/:email', ccController.movimientosparaclientes)




    return router;
}