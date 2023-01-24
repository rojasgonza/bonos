const CuentaCorriente = require('../models/cc')
const db = require('../config/config');



///unir por cliente
exports.ccc = async (req, res, next) => {
    const venta = await CuentaCorriente.findAll({
        group: 'clienteId'
    });
    if (!venta) {
        console.log(error)
        next()
    }
    res.json(venta)
}


//sumar totales por clientes
exports.totCliente = async (req, res, next) => {
    const results = await db.query("SELECT SUM(ingreso-salida) as Total from cuentacorrientes where clienteId = " + req.params.idCliente);

    // const result = await db.query("SELECT SUM(ingreso-salida) as Total from cuentacorrientes where clienteId = " + req.params.idCliente)
    if (!results) {
        console.log(error)
        next()
    }
    res.json(results[0])
}


////buscar por dia
exports.saldopordia = async (req, res, next) => {
    const results = await db.query("SELECT SUM(ingreso-salida) as Total from cuentacorrientes where fecha = " + '"'+req.params.fecha+'"');

    // const result = await db.query("SELECT SUM(ingreso-salida) as Total from cuentacorrientes where clienteId = " + req.params.idCliente)
    if (!results) {
        console.log(error)
        next()
    }
    res.json(results[0])
}
///
//buscar por cliente
exports.cuentaxcliente = async (req, res, next) => {
    const venta = await CuentaCorriente.findAll({
        where: {
            clienteId: req.params.idCliente
        },
        include: [
            {
                association: CuentaCorriente.Cliente
            }
        ]
    });
    if (!venta) {
        console.log(error)
        next()
    }
    res.json(venta)
}






////////////////////////////////////////////// PRUEBAS
exports.movimientosparaclientes = async (req, res, next) => {
    const results = await db.query("SELECT cuentacorrientes.id, fecha, ingreso ,salida ,aclaraciones, clientes.nombre, clientes.apellido FROM cuentacorrientes LEFT JOIN clientes ON clientes.id = clienteId WHERE clientes.email = " + '"' + req.params.email + '"' );
    
    // const result = await db.query("SELECT SUM(ingreso-salida) as Total from cuentacorrientes where clienteId = " + req.params.idCliente)
    if (!results) {
        console.log(error)
        next()
    }
    res.json(results[0])
}
///////////////////////////////////////



exports.nuevaCC = async (req, res, next) => {
    const { fecha, ingreso, salida, clienteId, aclaraciones } = req.body;
    const cc = await CuentaCorriente.create({ fecha, ingreso, salida, fecha, clienteId, aclaraciones })
    if (!cc) {
        console.log(error)
        next()
    }
    res.json({ mensaje: "creado la cc" })
}

exports.mostrarCCS = async (req, res, next) => {
    const ccs = await CuentaCorriente.findAll({
        include: [
            {
                association: CuentaCorriente.Cliente
            }
        ]

    })
    if (!ccs) {
        console.log(error);
        next()
    }
    res.json(ccs);
};
exports.mostrarCC = async (req, res, next) => {
    let condition = { where: { id: req.params.idCC } }
    const cc = await CuentaCorriente.findOne({
        include: [
            {
                association: CuentaCorriente.Cliente
            }
        ], condition

    })
    if (!cc) {
        console.log(error);
        next()
    }
    res.json(cc);
};

exports.editarCC = async (req, res, next) => {
    let condition = { where: { id: req.params.idCC } }
    const cc = await CuentaCorriente.update({
        fecha: req.body.fecha,
        ingreso: req.body.total,
        salida: req.body.acuenta,
        clienteId: req.body.clienteId,
        aclaraciones: req.body.aclaraciones
    }, condition)
    if (!cc) {
        console.log(error);
        next()
    }
    res.json({ mensaje: "editado el cc" })
}

exports.borrarCC = async (req, res, next) => {
    let condition = { where: { id: req.params.idCC } }
    const cc = await CuentaCorriente.destroy(condition)
    if (!cc) {
        console.log(error)
        next()
    }
    res.json({ mensaje: "cc borrado" })
}