const mongoose = require('mongoose')

var getDB = false
switch (process.argv.length){
case 2:
  console.log('Password Missing')
  process.exit(1)
  break
case 3:
  getDB = true
  break
case 4:
  console.log('Number Missing')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://marcosl2017:${password}@phonebookcluster.fb4ogrg.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=PhonebookCluster`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Entry = mongoose.model('phonenumber', phoneSchema)

if (getDB){
  console.log('Fetching Database')
  Entry.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name}: ${person.number}`)
    })
    mongoose.connection.close()
  })
}
else{
  const name = process.argv[3]
  const number = process.argv[4].replace(/[^0-9-]+/, '')

  const person = new Entry({
    name: name,
    number: number,
  })

  person.save().then(() => {
    console.log('Person saved!')
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}