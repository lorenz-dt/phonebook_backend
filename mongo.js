const mongoose = require('mongoose')

// need at least 3 arguments to connect to DB
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

// connect to DB using password
const password = process.argv[2]
const url = `mongodb+srv://lorenz-dt:${password}@cluster0.lzcrmum.mongodb.net/?retryWrites=true&w=majority`
mongoose.set('strictQuery', false)
mongoose.connect(url)

// schema to read to/from DB
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person', personSchema)

// print DB entries if no data to add
if (process.argv.length < 4) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
    process.exit(0)
  })
} else {

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  person.save().then(result => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}
