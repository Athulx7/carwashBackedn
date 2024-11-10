const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    userename:{
        type:String,
        require: true
    },
    useremail:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    messages:{
        type:String,
        require:true

    }

})

const message = mongoose.model('message',messageSchema)
module.exports = message