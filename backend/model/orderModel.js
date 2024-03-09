var mongoose = require('mongoose');

var orderShema = mongoose.Schema({
    products : [{
        productName:{type:String},
        category:{type:String},
        image:{type:String},
        qty:{type:String},
        price:{type:String},
    }],
    paymentMode:{type:String},
    orderStatus:{type:String},
    userId:{type:String},
})

module.exports = mongoose.model('order',orderShema);