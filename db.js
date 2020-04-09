const mongoose = require('mongoose')

mongoose.connect(
  proocess.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  )
  .then(() => console.log('Database connected successfully'))
  .catch(() => console.log(err.message))
