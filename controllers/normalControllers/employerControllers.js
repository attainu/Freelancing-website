const Employer = require('../../models/Employer')

module.exports = {
  async register(req, res) {
    try {
      const { email, name, password } = req.body
      if (!email || !name || !password) {
        return res
          .status(400)
          .send({ statusCode: 400, message: 'Bad request' })
      }
      const employer = await Employer.create({
        email,
        name,
        password
      })
      const accessToken = await employer.generateToken()
      res.status(201).json({
        statusCode: 201,
        employer,
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
    const employer = req.user
    const accessToken = await employer.generateToken()
    res.json({
      statusCode: 200,
      employer,
      accessToken: `JWT ${accessToken}`,
      expiresIn: '12h'
    })
  },

  async showEmployerData(req, res) {
    res.json({ employer: req.user })
  }
  
}