var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    productName : {type:String},
    category : {type:String},
    price : {type:String},
    image : {type:String}
})

module.exports = mongoose.model("product",productSchema)