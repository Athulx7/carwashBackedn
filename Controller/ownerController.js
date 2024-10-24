const bookingCenter = require("../Models/bookingCenter")
const ownerComplaint = require("../Models/ownerComplaints")
const reviewCenter = require("../Models/reviewForCenter")
const searchCenter = require("../Models/searchCenter")
const washCenters = require("../Models/washCenterSchema")

exports.addCenterdetailsByOwner = async (req, res) => {
    console.log("inside owner controller")
    const ownerID = req.payload
    console.log(ownerID)
    // console.log(req.body)
    const image1 = req.files['image1'][0].filename
    const image2 = req.files['image2'][0].filename
    const image3 = req.files['image3'][0].filename


    const { washcentername,ownerName, owneremail, contactno, about, map, location, price } = req.body

    try {
        const existingCenter = await washCenters.findOne({ washcentername: washcentername, location: location })
        if (existingCenter) {
            res.status(409).json("this center is already exist")
        }
        else {
            const newCenter = new washCenters({
                washcentername,
                ownerName,
                owneremail,
                contactno,
                about,
                map,
                location,
                price,
                image1,
                image2,
                image3,
                ownerID
            })
            await newCenter.save();
            res.status(200).json("center details added successfully")
        }

    }
    catch (err) {
        res.status(401).json("addded faild due to", err)

    }
}

exports.getOwnercenterDetails = async (req,res)=>{
    // console.log("inside get owner center controller")
   const ownerID = req.payload
   try{
    const OwnerCenter = await washCenters.find({ownerID:ownerID})
    res.status(200).json(OwnerCenter)

   }
   catch(err){
    res.status(401).json("failed due to",err)

   }
   
}


exports.editCenterdetailing = async(req,res)=>{
    // console.log("inside edit controller")
    const {id}=req.params
    const ownerID = req.payload
    const { washcentername, ownereName, owneremail, contactno, about, map, location, price,image1,image2,image3 } = req.body
    const editImage1 = req.files && req.files['image1'] &&  req.files['image1'][0] ? req.files['image1'][0].filename : image1
    const editImage2 = req.files && req.files['image2'] &&  req.files['image2'][0] ? req.files['image2'][0].filename : image2
    const editImage3 = req.files && req.files['image3'] &&  req.files['image3'][0] ? req.files['image3'][0].filename : image3

   try{
    const updateCenter = await washCenters.findByIdAndUpdate(
        {_id:id},
        {
            washcentername:washcentername,
                ownerName:ownereName,
                owneremail:owneremail,
                contactno:contactno,
                about:about,
                map:map,
                location:location,
                price:price,
                image1:editImage1,
                image2:editImage2,
                image3:editImage3,
                ownerID:ownerID
        },
        {
            new:true
        }
    )
    await updateCenter.save()
    res.status(200).json(updateCenter)

   }
   catch(err){
    res.status(401).json(err)
    
   }  
}



//add complaint to the admin

exports.addComplainttoAdmin = async(req,res)=>{
    console.log("inside addcomplaintot admin controlller")
    const ownerID = req.payload
    const {ownername,centername,complaint}=req.body

    try{
        const addComplaint = new ownerComplaint({
            ownername,
            centername,
            complaint

        })
        await addComplaint.save()
        res.status(200).json(addComplaint)

    }
    catch(err){
        res.status(401).json(err)

    }

}


exports.getReviewsForSpe = async (req,res)=>{
    // console.log("inisde the get review controller")
    // console.log(req.payload)
    const ownerID = req.payload
    try{
        const getReviews = await reviewCenter.find({ownerID:ownerID})
        res.status(200).json(getReviews)
    }
    catch(err){
        res.status(401).json(err)

    }
}

exports.getBooking = async(req,res)=>{
    const ownerID = req.payload
    try{
        const getBook = await bookingCenter.find({ownerID:ownerID})
        res.status(200).json(getBook)
    }
    catch(err){
        res.status(401).json(err)
    }
}


exports.getavaliblefromsearch = async(req,res)=>{
    
    const ownerID = req.payload
    try{
        const getAail = await searchCenter.find({ownerID:ownerID})
        res.status(200).json(getAail)
    }
    catch(err){
        res.status(401).json(err)
    }
}


exports.deleteAndUpdate = async(req,res)=>{
    console.log("inisde delete and update")
    const {id}=req.params
    console.log(id)
    try{
        const deleting = await searchCenter.findOneAndDelete({centerID:id})
        const updating = await bookingCenter.updateOne({centerID:id,action:false},
            {
                $set:{action:true}
            }

        )
        res.status(200).json(updating)




    }
     catch(err){
        res.status(401).json(err)
     }
}