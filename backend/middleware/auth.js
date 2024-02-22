require('dotenv').config();
var jwt = require('jsonwebtoken');

exports.chk_token = async (req,res,next) =>{
    jwt.verify(req.headers.authorization,process.env.AUTH_SECRET_KEY,next)
}
