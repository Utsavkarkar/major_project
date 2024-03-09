const cart = require('../model/cartModel');
const product = require('../model/productModel');
const storage = require('node-persist');
storage.init( /* options ... */ );

exports.addToCart = async (req,res) => {
    var userId = await storage.getItem('userid');
    var data = await product.findById(req.query.id);

    var dataObj = {
        "productName":data.productName,
        "category":data.category,
        "image":data.image,
        "price":data.price,
        "qty":1,
        "userId":userId
    }
    // console.log(dataObj);
    var chk = await cart.find({"productName":data.productName,"userId":userId})
    // console.log(chk);
    if(chk.length == 0){
        await cart.create(dataObj);
        // console.log(addProToCart);
    }else{
        var qty = parseInt(chk[0].qty);
        // console.log(qty);
        var dataObj = {
            "qty":qty+1
        }
        var id = chk[0].id;
        var chk = await cart.findByIdAndUpdate(id,dataObj);
    }
    res.status(200).json({
        status:"inserted"
    })
}


// get cart of particuler user
exports.getCart = async (req,res) => {

    var userId = await storage.getItem('userid');    
    var chk = await cart.find({"userId":userId});
    // console.log(userId);
    res.status(200).json({
        status:"user's Cart is Here...",
        chk
    })   
}

// remove product from cart
exports.removeCartProduct = async (req,res) => {
    try {
        var id = req.query.id;
        await cart.findByIdAndDelete(id);
        res.status(200).json({
            status:"product removed from cart successfully"
        })
    } catch (error) {
        res.status(200).json({
            error
        })
    }
}

// quntity increment api 
exports.qtyPlus = async (req,res) => {
    try {
        // var id = req.query.id;
        var data = await cart.findById(req.query.id);
        var dataObj = {
            "productName":data.productName,
            "category":data.category,
            "image":data.image,
            "price":data.price,
            "qty":data.qty,
            "userId":data.userId
        }
        var qty = parseInt(data.qty);
        if(qty>=1){
            var dataObj = {
                "qty":qty+1
            }
        }
        await cart.findByIdAndUpdate(req.query.id,dataObj);

        res.status(200).json({
            status:"product's qty added by one..."
        })
    } catch (error) {
        res.status(200).json({
            error
        })
    } 
}

// quntity decrement api 
exports.qtyMinus = async (req,res) => {
    try {
        var id = req.query.id;
        var data = await cart.findById(id);
        var dataObj = {
            "productName":data.productName,
            "category":data.category,
            "image":data.image,
            "price":data.price,
            "qty":data.qty,
            "userId":data.userId
        }
        var qty = parseInt(data.qty);
        if(qty>1){
            var dataObj = {
              "qty":qty-1
            }
        }
        // else{
        //     await cart.findByIdAndDelete(id);
        // }
        await cart.findByIdAndUpdate(id,dataObj);
        res.status(200).json({
            status:"product's qty added by one..."
        })
    } catch (error) {
        res.status(200).json({
            error
        })
    } 
}








// get cart data api
//  exports.getCartData = async(req,res) => {
//     var userId = await storage.getItem('userid');
//     var chk = await cart.find({"userId":userId});
//     // console.log(chk);
//     res.status(200).json({
//         status:"ok done",
//         chk
//     })
//  }

