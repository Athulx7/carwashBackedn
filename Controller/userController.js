const users = require("../Models/userSchema")
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    // console.log("indie the user register controller")

    const { username, email, password } = req.body
    try {
        const existeduser = await users.findOne({ email: email })

        if (existeduser) {
            res.status(400).json("accounts already exist")
        }
        else {
            // console.log("user not exist")
            const newuser = new users({
                username:username,
                email:email,
                password:password
            })
            await newuser.save();
            res.status(201).json("User registration succefull")

        }
    }
    catch(err){
        res.status(401).json("registration request faild due to ",err)

    }
    

}


exports.login = async(req,res)=>{
    // console.log("inside user login controller")
    const {email,password} = req.body

    try{
        const existtinguser = await users.findOne({email:email,password:password}) 
        if(existtinguser){
            const token = jwt.sign({userid:existtinguser._id},"userpwd123")
            
            res.status(200).json({data:existtinguser,token:token})
        }else{
           res.status(401).json("invalid email or password")
        }


    }
    catch{
        res.status(500).json("internal server is in error")

    }

}


exports.getUserdata = async(req,res)=>{
    
    try{
        const allUsers = await users.find()
        res.status(200).json(allUsers)
    }
    catch(err)
    {
        res.status(401).json("get user is faild due to",err)
    }

}


