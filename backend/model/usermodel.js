var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email : {type:String},
    username : {type:String},
    password : {type:String},
    address : {
        house_no : {type:String},
        street : {type:String},
        city : {type:String},
        state : {type:String},
        pincode : {type:String}
    }
})

module.exports = mongoose.model("user",userSchema);