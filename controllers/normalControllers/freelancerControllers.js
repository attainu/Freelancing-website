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

   async showFreelancerData(req, res) {
    res.json({ freelancer: req.user })
  }
  
}