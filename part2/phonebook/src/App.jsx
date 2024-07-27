import { useState } from 'react'

const Person = ({person}) => {
    return (
        <div>
            {person.name} {person.number}
        </div>
    )
}

const App = () => {
  const [persons, setPersons] = useState([
    { 
        name: 'Arto Hellas',
        number: '2101564875',
        id: 1
    }
  ]) 
  const [newName, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPhone = (event) => {
    event.preventDefault()
    // console.log('button clicked', event.target)
    if (persons.some(person => person.name === newName)) {
        alert(`${newName} is already in the phonebook`)
        setNewPerson('')
        setNewNumber('')
        return 
    }
    const newPerson = {
        name:newName,
        number:newNumber,
        id:persons.length+1
    }
    setPersons(persons.concat(newPerson))
    setNewPerson('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewPerson(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPhone}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        { persons.map(person => <Person key={person.id} person={person} /> ) }
      </div>
    </div>
  )
}

export default App