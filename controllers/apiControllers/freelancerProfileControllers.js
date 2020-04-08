const freelancerProfile = require('../../models/FreelancerProfile')

module.exports = {
    async addDetails(req, res){
        try{
            const { 
                name,
                email,
                services,
                expertiseLevel, 
                description, 
                skills, 
                education, 
                employment, 
                languages, 
                location, 
                hourlyRate
            } = req.body

            const profileImage = req.file.path

            if(
                !name ||
                !email ||
                !services ||
                !expertiseLevel ||
                !description ||
                !skills ||
                !education ||
                !employment ||
                !languages ||
                !location ||
                !hourlyRate
            ) {
              return res
                .status(400)
                .send({
                  statusCode: 400,
                  message: 'Looks like some fields are incomplete'
                })
            }

            const freelancerDetails = await freelancerProfile.create({
                name,
                email,
                services,
                expertiseLevel,
                description,
                skills,
                education,
                employment,
                languages,
                location,
                hourlyRate,
                profileImage,
            })  

            res.status(201).json({
                statusCode: 201,
                freelancerDetails
              })

        }
        catch(err){
            console.log(err)
            res.status(500).send('Server Error')
        }
    },

    async viewAllFreelancers(req, res){
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

            results.results = await freelancerProfile
            .find()
            .select('name services languages location hourlyRate profileImage')
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

    async viewProfile(req, res){
        try{
            const profile = await freelancerProfile.findById(req.params.freelancerid)
            if(!profile){
                return res.status(404).json({
                    "message": "Profile Not Found"
                })
            }
            res.status(200).json({
                statusCode: 200,
                profile
            })
        }
        catch(err){
            console.log(err)
            res.status(500).send('Server Error')
        }
    },

    async deleteProfile(req, res){
        try{
            const profile = await freelancerProfile.remove({_id: req.params.freelancerid})
            if(!profile){
                return res.status(404).json({
                    "message": "Profile Not Found"
                })
            }
            res.status(200).json({
                "message": "Profile Deleted"
            })
        }
        catch(err){
            console.log(err)
            res.status(500).send('Server Error')
        }
    }
}