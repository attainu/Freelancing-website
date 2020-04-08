const job = require('../../models/EmployerJob')
const Order = require('../../models/Order')

module.exports = {
    async createJob(req, res) {
        try{
            const { 
                name,
                email,
                title,
                category, 
                description, 
                budget, 
                duration, 
                timeRequirement
            } = req.body

            const projectFile = req.file.path

            if(
                !name ||
                !email ||
                !title ||
                !category ||
                !description ||
                !budget ||
                !duration ||
                !timeRequirement
            ) {
              return res
                .status(400)
                .send({
                  statusCode: 400,
                  message: 'Looks like some fields are incomplete'
                })
            }
            const jobDetails = await job.create({
                name,
                email,
                title,
                category,
                description,
                budget,
                duration,
                timeRequirement,
                projectFile,
            })  
            res.status(201).json({
                statusCode: 201,
                jobDetails
              })
        }
        catch(err){
            console.log(err)
            res.status(500).send('Server Error')
        }
    },

    async viewAllJobs(req, res) {
        try{
            const limit = parseInt(req.query.limit )
            const page = parseInt(req.query.page) 
            const startIndex = (page - 1) * limit
            const endIndex = page * limit

            const results = {}

            if(endIndex < await freelancerProfile.countDocuments().exec()){
                results.next = {
                    page: page + 1,
                    limit: limit
                }
            }

            if(startIndex > 0){
                results.previous = {
                    page: page - 1,
                    limit: limit
                }
            }

            results.results = await job
            .find()
            .select('name title category description budget duration')
            .limit(limit)
            .skip(startIndex)
            
            res.status(200).json({
                statusCode: 200,
                results
            })
        }
        catch(err){
            console.log(err)
            res.status(500).send('Server Error')
        }
    },

    async viewJob(req, res) {
        try{
            const job = await freelancerProfile.findById(req.params.jobId)
            if(!job){
                return res.status(404).json({
                    "message": "Job Not Found"
                })
            }
            res.status(200).json({
                statusCode: 200,
                job
            })
        }
        catch(err){
            console.log(err)
            res.status(500).send('Server Error')
        }
    },

    async updateJob(req, res) {
        try{
            const updateFields = {}
            for(const ops of req.body){
                updateFields[ops.propName] = ops.value
            }
            const result = await job.updateOne({_id: req.params.jobId}, {$set: updateFields})
            res.status(200).json({
                "message": "Job Details Updated",
                statusCode: 200,
                result
            })
        }
        catch(err){
            console.log(err)
            res.status(500).send('Server Error')
        }
    },

    async deleteJob(req, res) {
        try{
            const job = await freelancerProfile.deleteOne({_id: req.params.jobId})
            if(!job){
                return res.status(404).json({
                    "message": "Job Not Found"
                })
            }
            res.status(200).json({
                "message": "Job Deleted"
            })
        }
        catch(err){
            console.log(err)
            res.status(500).send('Server Error')
        }
    },

    async checkout(req, res) {
        try{
            const freelancer = req.params.freelancerid
            const employer = req.user._id
            if(!freelancer || !employer){
                return res.status(404).json({
                    'message': 'Invalid Credentials'
                })
            }
            const order = await Order.create({
                freelancer,
                employer
            })
            res.status(201).json({
                statusCode: 201,
                order
            })
        }
        catch(err){
            console.log(err)
            res.status(500).send('Server Error')
        }   
    }
}