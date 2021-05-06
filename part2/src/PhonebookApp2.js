import React, { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'
import { Persons, PersonForm, FilterPersons } from './components/PersonForm.js'

const Notification = ({ message, class_name }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={class_name}>
      {message}
    </div>
  )
}


const PhonebookApp = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ someFilter, setFilter ] = useState('')
  const [ successMessage, setSuccessMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

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
        const newPerson = {
            name: newName,
            number: newNumber
        }

        const matchedPersons = persons.filter(p => p.name.includes(newPerson.name))

        if (matchedPersons.length === 0) {
            phonebookService
              .create(newPerson)
              .then(p => {
                setPersons(persons.concat(p))
                setNewName('')
                setNewNumber('')
              })
        } else {
            const matchedPerson = { ...matchedPersons[0], number: newNumber }
            if (window.confirm(`${matchedPerson.name} is already in the phonebook, replace old number with new one?`)) {
                phonebookService
                  .update(matchedPerson.id, matchedPerson)
                  .then(p => {
                    setPersons(persons.map(person => person.id !== matchedPerson.id ? person : matchedPerson))
                    setNewName('')
                    setNewNumber('')
                    setSuccessMessage(`Phone number for ${matchedPerson.name} updated.`)
                    setTimeout(() => { setSuccessMessage(null) }, 5000)
                  })
                  .catch(error => {
                    setErrorMessage(`${matchedPerson.name} has been removed from the server.`)
                    setTimeout(() => { setErrorMessage(null) }, 5000)
                    setPersons(persons.filter(person => person.id !== matchedPerson.id))
                  })
            }
        }
  }

  const removePerson = (person) => {
      if (window.confirm(`Delete ${person.name}?`)) {
        phonebookService
          .remove(person.id)
          .then(() => {
            setPersons(persons.filter(p => p.id !== person.id))
          })
      }
  }

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={successMessage} class_name="success" />
      <Notification message={errorMessage} class_name="error" />

      <h2>Filter Entries</h2>
      <FilterPersons someFilter={someFilter} handleFilter={handleFilter} />

      <h2>Add New Entry</h2>
      <PersonForm
        addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons
        persons={personsToShow}
        removePerson={removePerson}
      />

    </div>
  )
}

export default PhonebookApp ;