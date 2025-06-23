const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(() => {
    console.log('Connection successful')
  })
  .catch(error => {
    console.log('Connection Failed')
    console.log(error.message)
  })

const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate:{
      validator: function(v){
        return /^\d{2,3}-\d+/.test(v)
      },
      message: props => `${props.value} Must start with 2 to 3 numbers before a dash (-)!`
    },
    required: true
  },
})

phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('phonenumber', phoneSchema)
