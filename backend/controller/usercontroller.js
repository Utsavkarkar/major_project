var user = require('../model/usermodel');
const storage = require('node-persist');
storage.init( /* options ... */ );

exports.register = async(req,res)=>{

    try {
        var chkdata = await user.find({email:req.body.email})
        if(chkdata == 0){
            var data =await user.create(req.body);
            console.log(data.cart);
            res.status(200).json({
                status:"ok",
                data
            })

        }
        else{
            res.json("you are alresdy registered");
        }
    } catch (error) {
        res.status(200).json({
           error
        })
    }

}

exports.login = async(req,res)=>{

    try {
        var chkdata = await user.find({email:req.body.email})
        var data = req.body;
        // console.log(chkdata);
        // console.log(chkdata.email);
        await storage.setItem('userid',chkdata[0]._id);
        // console.log(await storage.getItem('userid'));
        if(chkdata.length == 1){
            if(chkdata[0].password == req.body.password){
                res.status(200)
                .json({
                    status:"logged in",
                    data
                })
            }else{
                 res.status(200).json("check your email or password");
            }
        }
        else{
            res.status(200).json("registered first");
        }
    } catch (error) {
        res.status(200).json({
           error
        })
    }

}

exports.Forgot_pass = async (req, res) => {

    try {
        var chk_data = await user.find({ "email": req.body.email })

        if (chk_data.length == 1) {

            var id = chk_data[0]._id;

            var change_pass = await user.findByIdAndUpdate(id,req.body);

            res.status(200).json("data updated successfully");
            
        }else {
            res.status(200).json("Cheack Your Email Again...")
        }
    } catch (error) {
        res.status(200).json({
            error
        })
    }
}

// exports.getUsers = async(req,res) => {
//     try {
//         var data = await user.find().populate("cart")
//         res.status(200).json({
//             status: "Users are here !!!",
//             data
//         })
//     } catch (error) {
//         res.status(200).json({
//             error
//         })
//     }
// }