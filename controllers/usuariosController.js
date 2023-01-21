const Usuarios = require('../models/usuarios')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.registrar = async (req,res) =>{
    const usuario = new Usuarios(req.body);
    usuario.clave = await bcrypt.hash(req.body.clave, 12);
    try {
        await usuario.save()
        res.json({mensaje: 'usuario creado'})
    } catch (error) {
        console.log(error)
        res.json({mensaje: 'error'})
    }
}
exports.iniciar =  async (req,res,next) =>{
    let condition = { where: {email: req.body.email } }
    const usuario = await Usuarios.findOne(condition)
    if(!usuario){
        await res.status(401).json({mensaje: "ese no existe"})
        next()
    }else{
        if(!bcrypt.compareSync(req.body.clave, usuario.clave)){
            await res.status(401).json({mensaje: "clave no existe"})
            next()
        }else{
            const token = jwt.sign({
                email: usuario.email,
                nombre: usuario.nombre,
                id: usuario.id
            },
            'llave',
            {
                expiresIn:'1h'
            });
            res.json({token})
        }
    }
    
}