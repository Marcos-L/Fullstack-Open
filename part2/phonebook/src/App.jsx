import { useState, useEffect } from 'react'
import pbServices from './services/phonebookservices'

import PhoneList from './components/phonelist'
import AddPerson from './components/addperson'
import SearchName from './components/searchperson'


const App = () => {
  //States
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setFilterName] = useState('')

  //Effects
  useEffect(()=>{pbServices.getDB().then(db=>setPersons(db))}, [])

  //Functions
  const handleNameChange = (event) => {
    var name = event.target.value
    name = name.replace(/[^A-Za-z\-]+/,'')
    setNewName(name)
  }

  const handleNumberChange = (event) => {
    var number = event.target.value
    number = number.replace(/[^0-9\-]+/, '')
    setNewNumber(number)
  }

  const searchFunction = (event) => {
    var name = event.target.value
    name = name.replace(/[^A-Za-z\-]+/,'')
    setFilterName(name)
  }

  const addName = (event) => {
    event.preventDefault()

    if (!persons.find((elem) => elem.name==newName)){
      const new_person = { name: newName, number:newNumber}
      pbServices.addToDB(new_person).then(newEntry => {
        const new_list = persons.concat(newEntry)
        setPersons(new_list)
        setNewName('')
        setNewNumber('')
      })
    }
    else{
      const confirmation = confirm(`Warning: ${newName} is already in the phonebook. Would you like you like to update the number?`)
      if (confirmation){
        const updated_person = persons.find(elem=>elem.name===newName)
        updated_person.number = newNumber
        pbServices.modDb(updated_person.id, updated_person).then(updatedData=>
          setPersons(persons.map(elem=>elem.id===updatedData.id ? updatedData : elem))
        )
      }
    }
  }

  const deleteName = (id) =>{
    const person = persons.find(elem=>elem.id===id)
    const confirmation = confirm(`Are you sure you want to delete ${person.name}?`)
    if (confirmation){
    pbServices.delFromDB(id).then(response=>
      setPersons(persons.filter(elem=>elem.id!=id))
    )}
  }

  //Code
  const nameToShow = persons.filter((elem) => {return elem.name.toLowerCase().search(searchName.toLowerCase())+1})

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchName onChange={searchFunction} name={searchName}/>
      <AddPerson name={newName} nameChange={handleNameChange} number={newNumber} numberChange={handleNumberChange} onSubmit={addName}/>
      <h2>Numbers</h2>
      <ul><PhoneList list = {nameToShow} onClick={deleteName}/></ul>
    </div>
  )
}

export default App