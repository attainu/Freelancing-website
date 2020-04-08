const { Router } = require('express')
const passport = require('passport')
const upload = require('../../multer')
const { addDetails, viewAllFreelancers, viewProfile, updateProfile, deleteProfile, checkout } = require('../../controllers/apiControllers/freelancerApiControllers')

const router = Router()

router.post(
    '/addDetails',
    passport.authenticate('freelancer-jwt', { session: false }),            
    upload.single('profileImage'), 
    addDetails)

router.get(
    '/viewFreelancers',
    viewAllFreelancers)

router.get(
    '/viewProfile/:freelancerid',
    viewProfile
)

router.patch(
    '/updateProfile/:freelancerid',
    passport.authenticate('freelancer-jwt', { session: false }),
    updateProfile
)

router.delete(
    '/deleteProfile/:freelancerid',
    passport.authenticate('freelancer-jwt', { session: false }),
    deleteProfile
)

router.post(
    '/checkout/acceptJob/:employerid',
    passport.authenticate('freelancer-jwt', { session: false }),
    checkout
)

module.exports = router