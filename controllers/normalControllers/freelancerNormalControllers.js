const Freelancer = require('../../models/Freelancer')

module.exports = {
  async register(req, res) {
    try {
      const { email, name, password } = req.body
      if (!email || !name || !password) {
        return res
          .status(400)
          .send({ statusCode: 400, message: 'Bad request' })
      }
      const freelancer = await Freelancer.create({
        email,
        name,
        password
      })
      const accessToken = await freelancer.generateToken()
      res.status(201).json({
        statusCode: 201,
        freelancer,
        accessToken: `JWT ${accessToken}`,
        expiresIn: '12h'
      })
    }
    catch (err) {
      console.log(err)
      res.status(500).send('Server Error')
    }
  },

  async login(req, res) {
    const freelancer = req.user
    const accessToken = await freelancer.generateToken()
    res.json({
      statusCode: 200,
      freelancer,
      accessToken: `JWT ${accessToken}`,
      expiresIn: '12h'
    })
  },
  
  async updateAccount(req, res) {
    try{
      const updateFields = {}
      for(const ops of req.body){
          updateFields[ops.propName] = ops.value
      }
      const result = await freelancerProfile.updateOne({_id: req.params.freelancerid}, {$set: updateFields})
      res.status(200).json({
          "message": "Account Details Updated",
          statusCode: 200,
          result
      })
    }
    catch(err){
      console.log(err)
      res.status(500).send('Server Error')
    }
  },

  async deleteAccount(req, res) {
    try {
      const account = await freelancer.deleteOne({
        _id: req.params.freelancerid,
      })
      if (!account) {
        return res.status(404).json({
          message: 'Account Not Found',
        })
      }
      res.status(200).json({
        message: 'Account Deleted',
      })
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error')
    }
  }
  
}