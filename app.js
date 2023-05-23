const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')

const PORT = config.get('port') || 5000;
const app = express()
app.use(cors())

app.use(express.json({extended: true}))
app.use('/t', require('./routes/redirect.routes'))
app.use('/api/auth', require('./routes/auth-routes'))
app.use('/api/link', require('./routes/link.routes'))

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*' , (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

async function start() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true
    })

    app.listen(PORT, () => console.log(`the server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
}

start()
