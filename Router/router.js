const express = require('express')


const router = new express.Router()
const jwtMiddleware = require('../Middleware/jwtMiddleware')
const userController = require('../Controller/userController')
const adminController = require('../Controller/adminController')
const ownerController = require('../Controller/ownerController')
const multterMiddleware = require('../Middleware/multterMiddleware')
const mainusercontroller = require('../Controller/MainUserController')



router.post('/user/register',userController.register)
router.post('/user/login',userController.login)


//admin

router.get('/admin/getusers',userController.getUserdata)
router.post('/admin/addowner',adminController.addOwnerByAdmin)
router.delete('/admin/deleteowner/:id',adminController.deleteAddedOwnerByAdmin)
router.get('/admin/getcomplaints',adminController.getOwnersComplaint)
router.get('/admin/getwebreview',adminController.getWebsiteReviews)
router.get('/admin/getmessage',adminController.getMessages)

//owner
router.post('/owner/addcenterdetails',jwtMiddleware,multterMiddleware.uploadMultipleField,ownerController.addCenterdetailsByOwner)
router.get('/owner/specifOwnerCenter',jwtMiddleware,ownerController.getOwnercenterDetails)
router.put('/owner/editCenter/:id',jwtMiddleware,multterMiddleware.uploadMultipleField,ownerController.editCenterdetailing)
router.post('/owner/addcomplaint',jwtMiddleware,ownerController.addComplainttoAdmin)
router.get('/owner/getReviews',jwtMiddleware,ownerController.getReviewsForSpe)
router.get('/owner/getBookingdetails',jwtMiddleware,ownerController.getBooking)
router.get('/owner/availablity',jwtMiddleware,ownerController.getavaliblefromsearch)
router.delete('/owner/deleteUpdate/:id',jwtMiddleware,ownerController.deleteAndUpdate)


//user

router.get('/user/getHomecenters',mainusercontroller.getSixHomeCenters)
router.get('/user/getMoreCenter',mainusercontroller.getMoreCenters)
router.get('/user/seleecetdCenter/:id',mainusercontroller.getSelectedCenterDetails)
router.post('/user/addreviewCenter',mainusercontroller.addReviewForCenter)
router.get('/user/reviewSpeci/:id',mainusercontroller.getREviews)
router.post('/user/addwebreview',mainusercontroller.addWebReviews)
router.get('/user/getwebreview',mainusercontroller.getWebRewviews)
router.post('/user/addbooking',mainusercontroller.addBookingDetails)
router.get('/user/search/:location/:date/:time',mainusercontroller.searchingresult)
router.post('/user/addmessage',mainusercontroller.sendMessage)







module.exports = router;