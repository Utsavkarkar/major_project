require('dotenv').config();
const admin = require('../model/adminmodel')
var jwt = require('jsonwebtoken');
const storage = require('node-persist');
storage.init();

exports.adminLogin = async(req,res)=>{
    try {
        var chk = await admin.find();
        var name = req.body.adminName;
        if(chk[0].adminName == name){
            var password = req.body.password;
            if(chk[0].password == password){
                var token = jwt.sign({chk}, process.env.AUTH_SECRET_KEY);
        
                res.status(200).json({
                    status:"logged in",
                    token
                })
            }else{
                 res.status(200).json({
                    status:"check your name or password",
                })
            }
        }else{
            res.status(200)
            .json({
                status:"admin is not exist",
            })
        }
    } catch (error) {
        res.status(500).json({
           error
        })
    }
}