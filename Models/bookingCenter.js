const mongoose = require('mongoose')

const bookingCenterSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    useremail:{
        type:String,
        require:true
    },
    centername:{
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
    },
    location:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    time:{
        type:String,
        require:true
    },
    action:{
        type:Boolean,
        require:true
    }

})

const bookingCenter = mongoose.model("bookingCenter",bookingCenterSchema)
module.exports = bookingCenter