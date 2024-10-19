const washCenters = require("../Models/washCenterSchema")

exports.addCenterdetailsByOwner = async (req, res) => {
    console.log("inside owner controller")
    const ownerID = req.payload
    console.log(ownerID)
    // console.log(req.body)
    const image1 = req.files['image1'][0].filename
    const image2 = req.files['image2'][0].filename
    const image3 = req.files['image3'][0].filename


    const { washcentername, owneremail, contactno, about, map, location, price } = req.body

    try {
        const existingCenter = await washCenters.findOne({ washcentername: washcentername, location: location })
        if (existingCenter) {
            res.status(409).json("this center is already exist")
        }
        else {
            const newCenter = new washCenters({
                washcentername,
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
    const { washcentername, owneremail, contactno, about, map, location, price,image1,image2,image3 } = req.body
    const editImage1 = req.files && req.files['image1'] &&  req.files['image1'][0] ? req.files['image1'][0].filename : image1
    const editImage2 = req.files && req.files['image2'] &&  req.files['image2'][0] ? req.files['image2'][0].filename : image2
    const editImage3 = req.files && req.files['image3'] &&  req.files['image3'][0] ? req.files['image3'][0].filename : image3

   try{
    const updateCenter = await washCenters.findByIdAndUpdate(
        {_id:id},
        {
            washcentername:washcentername,
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