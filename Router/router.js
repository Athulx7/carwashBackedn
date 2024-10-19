const express = require('express')


const router = new express.Router()
const jwtMiddleware = require('../Middleware/jwtMiddleware')
const userController = require('../Controller/userController')
const adminController = require('../Controller/adminController')
const ownerController = require('../Controller/ownerController')
const multterMiddleware = require('../Middleware/multterMiddleware')



router.post('/user/register',userController.register)
router.post('/user/login',userController.login)


//admin

router.get('/admin/getusers',userController.getUserdata)
router.post('/admin/addowner',adminController.addOwnerByAdmin)
router.delete('/admin/deleteowner/:id',adminController.deleteAddedOwnerByAdmin)

//owner
router.post('/owner/addcenterdetails',jwtMiddleware,multterMiddleware.uploadMultipleField,ownerController.addCenterdetailsByOwner)
router.get('/owner/specifOwnerCenter',jwtMiddleware,ownerController.getOwnercenterDetails)
router.put('/owner/editCenter/:id',jwtMiddleware,multterMiddleware.uploadMultipleField,ownerController.editCenterdetailing)

//user


module.exports = router;