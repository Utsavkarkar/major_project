require('dotenv').config();
const admin = require('../model/adminmodel')
var jwt = require('jsonwebtoken');
const storage = require('node-persist');
storage.init();

exports.adminLogin = async(req,res)=>{
    try {
        var chk = await admin.find();
        // console.log(chk[0].adminName);
        var name = req.body.adminName;
        // console.log(name);
        if(chk[0].adminName == name){
            var password = req.body.password;
            if(chk[0].password == password){
                // console.log("logged in")
                var token = jwt.sign({chk}, process.env.AUTH_SECRET_KEY);
                // await storage.setItem('tkn',token);
                // console.log(await storage.getItem('tkn'));
                res.status(200).json({
                    status:"logged in",
                    token
                })
            }else{
                // console.log("chk name or pass")
                 res.status(200).json({
                    status:"check your name or password"
                    
                })
            }
        }else{
            console.log("no success")
            res.status(200).json({
                status:"check your password"
                
            })

        }
    } catch (error) {
        res.status(200).json({
           error
        })
    }

}