const mongoose = require('mongoose');

const {ObjectId} = mongoose.Schema;

const codeSchema = new mongoose.Schema({
    code:{
        type:Number,
        require:true,
    },
    user:{
        type:ObjectId,
        ref:"User",
        required:true
    }
})
module.exports = mongoose.model("Code",codeSchema)
 