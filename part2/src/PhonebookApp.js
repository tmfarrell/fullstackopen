
import React, { useState } from 'react'
import { Persons, PersonForm, FilterPersons } from './components/PersonForm.js'


const PhonebookApp = () => {
  const [ persons, setPersons ] = useState([
    { name: 'First Last', number: '800-123-4567' },
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ someFilter, setFilter ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = persons.filter(p => p.name.includes(someFilter))

  const addPerson = (event) => {
        event.preventDefault()
        const new_person = {
            name: newName,
            number: newNumber
        }
        if (persons.map(p => p.name).includes(newName)) {
            window.alert(`${newName} is already in the phonebook`)
        } else {
            setPersons(persons.concat(new_person))
            setNewName('')
            setNewNumber('')
        }
  }

  return (
    <div>
      <h1 style={{color: "red"}}>Phonebook</h1>

      <h2>Filter Entries</h2>
      <FilterPersons someFilter={someFilter} handleFilter={handleFilter} />

      <h2>Add New Entry</h2>
      <PersonForm
        addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} />

    </div>
  )
}

export default PhonebookApp ;