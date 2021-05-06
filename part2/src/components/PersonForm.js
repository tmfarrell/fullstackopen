import React from 'react'

const Person = ({ person, removePerson }) => {
  return (
    <li><b>{person.name}</b> / {person.number}
        <button onClick={removePerson}>delete</button>
    </li>
  )
}

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
    return (
        <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

const Persons = ({ persons, removePerson }) => {
    return (
        <div>
            {persons.map(p => <Person key={p.name} person={p} removePerson={() => removePerson(p)} />)}
        </div>
    )
}

const FilterPersons = ({ someFilter, handleFilter }) => {
    return (
      <form>
        <div><input value={someFilter} onChange={handleFilter} /></div>
      </form>
    )
} ;

export { PersonForm, Persons, FilterPersons } ;