const { Router } = require('express')
const passport = require('passport')
const upload = require('../../multer')
const { createJob, viewAllJobs, viewJob, updateJob, deleteJob, checkout, createRating } = require('../../controllers/apiControllers/employerApiControllers')

const router = Router()

router.post(
    '/postJob',
    passport.authenticate('employer-jwt', { session: false }),            
    upload.single('projectFile'), 
    createJob)

router.get(
    '/viewJobs',
    viewAllJobs)

router.get(
    '/viewJob/:jobId',
    viewJob
)

router.patch(
    '/updateJob/:jobId',
    passport.authenticate('employer-jwt', { session: false }),
    updateJob
)

router.delete(
    '/deleteJob/:jobId',
    passport.authenticate('employer-jwt', { session: false }),
    deleteJob
)

router.post(
    '/checkout/hireFreelancer/:freelancerid',
    passport.authenticate('employer-jwt', { session: false }),
    checkout
)

router.post(
    '/reviews/:freelancerid',
    passport.authenticate('employer-jwt', { session: false }),
    createRating
)

module.exports = router