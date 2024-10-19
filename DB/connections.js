const mongoose = require('mongoose')

const connectionstring = process.env.DATABASE;

mongoose.connect(connectionstring).then((res)=>{
    console.log("mongo DB connected succefully")
}).catch((err)=>{
    console.log("mongo DB connection faild")
    console.log(err)
})