const jwt = require('jsonwebtoken')

module.exports = async (req,res,next)=>{
    const authHeader = req.get('Authorization')
    console.log(authHeader)
    if(!authHeader){
        const error = new Error('no hay jwt')
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1]
    try {
        revisarToken = jwt.verify(token, 'llave')
    } catch (error) {
        error.statusCode = 500;
        throw error
    }

    //valido pero error
    if(!revisarToken){
        const error = new Error('no autenticado')
        error.statusCode = 401;
        throw error;
    }
    next()

}