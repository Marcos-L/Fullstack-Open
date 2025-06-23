const express = require('express')
var morgan = require('morgan')
const app = express()
const cors = require('cors')

let db = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

morgan.token('payload', (request, response)=> {
  return JSON.stringify(request.body)
})
app.use(morgan((tokens, request, response)=>{
return [
    tokens.method(request, response),
    tokens.url(request, response),
    tokens.status(request, response),
    tokens.res(request, response, 'content-length'), '-',
    tokens['response-time'](request, response), 'ms',
    tokens['payload'](request, response)
  ].join(' ')
}, {skip: (request, response)=>{return request.method!=="POST"}}))

app.get('/', (request, response) =>{
  response.send('<h1>Phonebook Backend Exercise</h1>')
})

app.get('/info', (request,response)=>{
  const datetime = new Date()
  response.send(`Phonebook has info for ${db.length} ${db.length===1?'person':'people'}
      <br>${datetime}`)
})

app.get ('/api/persons', (request, response)=>{
    response.json(db)
})

app.get ('/api/persons/:id', (request, response)=>{
  const id = request.params.id
  const person = db.find(person => person.id===id)
  if (person){
      response.json(person)
  }
  else{
      response.statusMessage = 'Error 404: Person not found'
      response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request,response)=>{
  const id = request.params.id
  const person = db.find(elem=>elem.id===id)
  db = db.filter(person=>person.id !== id)
  response.status(200).json(person).end()
})

app.post('/api/persons', (request, response)=>{
  const person = request.body
  if (person.name && person.number){
    if (db.filter(elem=>elem.name===person.name).length){
      return response.status(406).json({error: 'Name already in phonebook.'})
    }
    
    let id = 0
    do{
    id = Math.round(Math.random()*10**9)
    }while (db.filter(elem=>{elem.id!==id}).length)

    const new_person = {
      id:String(id),
      name:person.name,
      number:person.number
    }
    
    db.push(new_person)
    response.status(200).json(new_person).end()}
  else{
    return response.status(400).json({error: 'Content Missing'})
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})