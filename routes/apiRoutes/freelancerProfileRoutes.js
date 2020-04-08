const { Router } = require('express')
const passport = require('passport')
const upload = require('../../multer')
const { addDetails, viewAllFreelancers, viewProfile, deleteProfile } = require('../../controllers/apiControllers/freelancerProfileControllers')

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
    passport.authenticate('employer-jwt', { session: false }),
    viewProfile
)

router.delete(
    '/deleteProfile/:freelancerid',
    passport.authenticate('freelancer-jwt', { session: false }),
    deleteProfile
)

module.exports = router