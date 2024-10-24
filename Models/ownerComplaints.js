const mongoose = require('mongoose')

const ownerComplaintSchema = new mongoose.Schema({
    ownername:{
        type:String,
        require:true
    },
    centername:{
        type:String,
        require:true
    },
    complaint:{
        type:String,
        require:true
    }
})

const ownerComplaint = mongoose.model("ownerComplaint",ownerComplaintSchema)
module.exports = ownerComplaint