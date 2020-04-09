const mongoose = require('mongoose')

mongoose.connect(
  'mongodb://127.0.0.1:27017/freelance',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  )
  .then(() => console.log('Database connected successfully'))
  .catch(() => console.log(err.message))
