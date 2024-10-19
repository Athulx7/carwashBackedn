const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log("inside the jwt middlewarre");

    const token = req.headers['authorization'].split(' ')[1];
    
    // console.log("token : ",token)

    try{
        const jwtResponce = jwt.verify(token,'userpwd123')
        // console.log(jwtResponce)
        req.payload = jwtResponce.userid
        next()

    }
    catch(err){
        res.status(401).json("authorization faid ",err)
    }

   
}

module.exports = jwtMiddleware