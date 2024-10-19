const mongoose = require('mongoose')

const washcenterSchema = new mongoose.Schema({
    washcentername: {
        type: String,
        require: true
    },
    owneremail: {
        type: String,
        require: true
    },
    contactno: {
        type: String,
        require: true
    },
    about: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    map: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true,

    },
    image1: {
        type: String,
        require: true
    },
    image2: {
        type: String,
        require: true
    },
    image3: {
        type: String,
        require: true
    },
    ownerID: {
        type: String,
        require: true

    }

})

const washCenters = mongoose.model("washCenters",washcenterSchema)
module.exports = washCenters