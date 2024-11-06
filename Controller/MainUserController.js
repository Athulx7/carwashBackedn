const bookingCenter = require("../Models/bookingCenter")
const reviewCenter = require("../Models/reviewForCenter")
const searchCenter = require("../Models/searchCenter")
const washCenters = require("../Models/washCenterSchema")
const websiteReview = require("../Models/websiteReview")

exports.getSixHomeCenters = async (req, res) => {
    // console.log('inisde get 6 of mainusercontroller')

    try {
        const sixCenters = await washCenters.find().limit(6)
        res.status(200).json(sixCenters)
    }
    catch (err) {
        res.status(401).json(err)

    }
}

exports.getMoreCenters = async (Req, res) => {
    // console.log("inisde get more centers")
    try {
        const getAllCenters = await washCenters.find()
        res.status(200).json(getAllCenters)

    }
    catch (err) {
        res.status(401).json(err)

    }
}



exports.getSelectedCenterDetails = async (req, res) => {
    // console.log("inside get selected center details")

    const { id } = req.params
    // console.log(id)

    try {
        const getCenterData = await washCenters.findById(id)
        res.status(200).json(getCenterData)

    }
    catch (err) {
        res.status(401).json(err)

    }

}


exports.addReviewForCenter = async (req, res) => {
    // console.log("add review for center controller")
    // console.log(req.body)
    const { username, useremail, washcentername, rating, review, centerID, ownerID } = req.body
    try {
        const addreviewCenter = new reviewCenter({
            username,
            useremail,
            washcentername,
            rating,
            review,
            centerID,
            ownerID

        })

        await addreviewCenter.save()
        res.status(200).json(addreviewCenter)


    }
    catch (err) {
        res.status(401).json(err)


    }


}


exports.getREviews = async (req, res) => {
    // console.log("inside getreview controler")
    const centerID = req.params.id
    try {
        const gettingreviews = await reviewCenter.find({ centerID })
        res.status(200).json(gettingreviews)

    }
    catch (err) {
        res.status(401).json(err)

    }


}


exports.addWebReviews = async (req, res) => {
    // console.log("inside add review for web")
    console.log(req.body)
    const { username, useremail, webreview, webreviewstar } = req.body

    try {
        const addingreviews = new websiteReview({
            username,
            useremail,
            webreview,
            webreviewstar
        })
        await addingreviews.save()
        res.status(200).json(addingreviews)

    }
    catch (err) {
        res.status(401).json(err)

    }
}



exports.getWebRewviews = async (req, res) => {
    // console.log("inside get review controller")
    try {
        const gettting = await websiteReview.find()
        res.status(200).json(gettting)

    }
    catch (err) {
        res.status(401).json(err)

    }
}



exports.addBookingDetails = async (req, res) => {
    // console.log("inisde add booking controller")
    console.log(req.body)
    const { username, useremail, centername, centerID, ownerID, location, date, time } = req.body
    try {
        const addbooking = new bookingCenter({
            username,
            useremail,
            centerID,
            centername,
            ownerID,
            location,
            date,
            time,
            action: false

        })
        await addbooking.save()


        const addSearch = new searchCenter({
            username,
            useremail,
            centerID,
            centername,
            ownerID,
            location,
            date,
            time

        })
        await addSearch.save()
        res.status(200).json(addbooking)



    }
    catch (err) {
        res.status(401).json(err)

    }
}


exports.searchingresult = async (req, res) => {
    // console.log("inside searching")
    // console.log(req.params)
    const addminutes = (time, minute) => {
        const date = new Date(time)
        return new Date(date.getTime() + minute * 60000)

    }

    const { location, date, time } = req.params

    const locationLower = location.toLowerCase()
    try {
        const searchTime = new Date(`${date}T${time}:00`)
        const startTime = addminutes(searchTime, -20).toISOString()
        const endTime = addminutes(searchTime, 20).toISOString()
        // console.log(searchTime)
        // console.log(startTime)
        // console.log(endTime)

        const searchingStarted = await searchCenter.find({
            location,
            date,
            time: { $gte: startTime.slice(11, 16), $lte: endTime.slice(11, 16) }
        })
        // console.log(searchingStarted)

        const extractCenterID = searchingStarted.map(centerid => centerid.centerID)
        console.log(extractCenterID)

        const availablity = await washCenters.find({
            location,
            _id: { $nin: extractCenterID }
        })

        res.status(200).json(availablity)

    }
    catch (err) {
        res.status(401).json(err)

    }

}


