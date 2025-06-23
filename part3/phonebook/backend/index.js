require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const app = express()
const cors = require('cors')
const Entry = require('./models/persons')

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

morgan.token('payload', (request) => {
  return JSON.stringify(request.body)
})

app.use(morgan((tokens, request, response) => {
  return [
    tokens.method(request, response),
    tokens.url(request, response),
    tokens.status(request, response),
    tokens.res(request, response, 'content-length'), '-',
    tokens['response-time'](request, response), 'ms',
    tokens['payload'](request, response)
  ].join(' ')
}, { skip: (request) => { return request.method!=='POST' } }))

app.get('/', (request, response) => {
  response.send('<h1>Phonebook Backend Exercise</h1>')
})

app.get('/info', (request,response) => {
  const datetime = new Date()
  Entry.find({}).then(query => {
    response.send(`Phonebook has info for ${query.length} ${query.length===1?'person':'people'}
        <br>${datetime}`)
  })
})

app.get ('/api/persons', (request, response) => {
  Entry.find({}).then(query => {
    response.json(query)
  })
})

app.get ('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Entry.findById(id)
    .then(query => {
      if (query){
        response.json(query)
      }
      else {
        response.statusMessage = 'Error 404: Person not found'
        response.status(404).end()
      }
    })
    .catch(error => {next(error)})
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Entry.findByIdAndDelete(id)
    .then(result => {
      response.status(200).json(result).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const person = request.body
  if (person.name && person.number){
    const new_person = new Entry({
      name:person.name,
      number:person.number
    })

    new_person.save()
      .then(result => {
        response.status(200).json(result).end()
      })
      .catch(error => {next(error)})
  }
  else{
    return response.status(400).json({ error: 'Content Missing' })
  }
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Entry.findById(request.params.id)
    .then(query => {
      if (query){
        query.name = name
        query.number = number

        return query.save().then(result => {
          response.json(result)
        })
      }
      else {
        response.statusMessage = 'Error 404: Person not found'
        response.status(404).end()
      }
    })
    .catch(error => {next(error)})
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})