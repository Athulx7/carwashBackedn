const router = require('./Router/router')

require('dotenv').config()
const express = require('express')
require('./DB/connections')
const cors = require('cors')

const cwserver = express()
cwserver.use(cors())
cwserver.use(express.json())
cwserver.use(router)
cwserver.use('/uploads',express.static('./uploads'))


const PORT = 4000;

cwserver.listen(PORT,()=>{
    console.log(`car wash server running in PORT ${PORT}`)
})

cwserver.get('/',(req,res)=>{
    res.send("the server is running")
})