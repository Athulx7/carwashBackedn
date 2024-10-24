const ownerComplaint = require("../Models/ownerComplaints")
const users = require("../Models/userSchema")
const websiteReview = require("../Models/websiteReview")

exports.addOwnerByAdmin = async (req, res) => {
    console.log("inside admin controller add owner by admin")
    const { centername, username, email, password, role } = req.body
    try {
        const existtinguser = await users.findOne({ email: email })
        if (existtinguser) {
            res.staus(400).json("accound already exists")
        }
        else {
            const newuser = new users({
                washcentername: centername,
                username: username,
                email: email,
                password: password,
                role: role

            })
            await newuser.save();
            res.status(201).json("owner addded by admin succesfull")

        }


    }
    catch (err) {
        res.status(401).json("owner added byb admin faild due to", err)

    }


}


exports.deleteAddedOwnerByAdmin = async (req, res) => {
    console.log(req.params)
    const { id } = req.params
    try {
        const removeOwener = await users.findByIdAndDelete({ _id: id })
        res.status(200).json('owner is removed')

    }
    catch (err) {
        res.status(401).json("owner removing is faild due to ", err)

    }
}



//get owners complaint 


exports.getOwnersComplaint = async (req, res) => {
    // console.log("inside get owners complaint controller")
    try {

        const ownerComplaints = await ownerComplaint.find()
        res.status(200).json(ownerComplaints)
    }
    catch (err) {
        res.status(401).json(err)

    }


}





//get website reviews 


exports.getWebsiteReviews = async(req,res)=>{
    // console.log("inside get website review controller")

    try{
        const gettingWebReviews = await websiteReview.find()
        res.status(200).json(gettingWebReviews)

    }
    catch(err){
        res.status(401).json(err)

    }
}