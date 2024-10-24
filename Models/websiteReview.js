const mongoose = require("mongoose")

const webReviewSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    useremail:{
        type:String,
        require:true
    },
    webreview:{
        type:String,
        require:true
    },
    webreviewstar:{
        type:Number,
        require:true
    }
})

const websiteReview = mongoose.model("websiteReview",webReviewSchema)
module.exports = websiteReview
