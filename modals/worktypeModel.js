const mongoose=require('mongoose');
var valid = require('validator');
const worktypeSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Suppler name is required']
    },
   
})
module.exports=mongoose.model('TypeOfWork',worktypeSchema)