const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const schemas = require('../lib/schemas')
const conf = require('../config')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.text())
app.use(express.static('public'));

const mongoDB = conf.mongo
mongoose.connect(mongoDB, { useNewUrlParser: true })
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
  res.sendStatus(200)
})

app.post('/create', async (req, res) => {
  try {
    const { name, description, type, duration } = req.body
    const assignment = await schemas.Assignments.insert({
      name, description, type, duration
    })
    res.status(201)
    res.send({ url: `/getAssignment/${assignment._id}` })
  } catch (e) {
    let validationErrors
    // if true errors are coming from schema validation and should be passed down to user
    if (e && e.errors) {
      validationErrors = 'Bad parameter:'
      for (let key in e.errors) {
        validationErrors += ` ${e.errors[key].message}`
      }
    }
    res.status(400)
    res.send({ error: validationErrors } || e)
  }
})

app.get('/getAssignment/:id', async (req, res) => {
  try {
    const { id } = req.params
    const assignment = await schemas.Assignments.findOne(id)
    if (assignment) {
      res.status(200)
      res.send(assignment)
    } else {
      res.status(404)
      res.send({ error: 'This assignment does not exist' })
    }
  } catch (e) {
    res.status(400)
    res.send(e)
  }
})

app.get('/searchTags/:tag', async (req, res) => {
  try {
    const { tag } = req.params
    const assignments = await schemas.Assignments.find({ tags: tag })
    res.status(200)
    res.send({
      assignments
    })
  } catch (e) {
    res.status(400)
    res.send(e)
  }
})

module.exports = app
