var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email : {type:String},
    username : {type:String},
    password : {type:String},
    cart : [{type:'ObjectId',ref:'cart'}]
})

module.exports = mongoose.model("user_collection",userSchema);