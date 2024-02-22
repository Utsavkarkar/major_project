const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    productName : {type:String},
    category : {type:String},
    price : {type:String},
    image : {type:String},
    qty : {type:String},
    userId : {type:String}
})

module.exports = mongoose.model("cart",cartSchema);