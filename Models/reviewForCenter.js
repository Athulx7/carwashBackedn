const mongoose = require('mongoose')

const reviewForCenterSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    useremail:{
        type:String,
        require:true
    },
    washcentername:{
        type:String,
        require:true
    },
    rating:{
        type:Number,
        require:true
    },
    review:{
        type:String,
        require:true
    },
    centerID:{
        type:String,
        require:true
    },
    ownerID:{
        type:String,
        require:true
    }

})


const reviewCenter = mongoose.model('reviewForCenter',reviewForCenterSchema)
module.exports = reviewCenter
