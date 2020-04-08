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

  async updateAccount(req, res) {
    try{
      const updateFields = {}
      for(const ops of req.body){
          updateFields[ops.propName] = ops.value
      }
      const result = await employer.updateOne({_id: req.params.employerid}, {$set: updateFields})
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
      const account = await employer.deleteOne({
        _id: req.params.employerid,
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