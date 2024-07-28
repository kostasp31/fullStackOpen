import { useState, useEffect } from 'react'
import personsService from './services/persons'

const Person = ({person, filter, delPerson}) => {
    if (person.name.includes(filter)) {
        return (
            <div>
                {person.name} {person.number} <button onClick={() => delPerson(person)}>delete</button>
            </div>
        )
    }
}

const Title = ({title}) => <h2>{title}</h2>

const Filter = ({filter, handleFilterChange}) => {
    return (
    <div>
        <Title title="Notebook" />
        Filter shown with:
        <form onSubmit={(event) => event.preventDefault()}>
            <input
            value={filter}
            onChange={handleFilterChange}
            />
        </form>
    </div>
    )
}

const NewPerson = ({newName, newNumber, handleNameChange, handleNumberChange, addPhone}) => {
    return (
    <div>
        <Title title="Add a new" />
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
    </div>
    )
}

const Display = ({persons, filter, delPerson}) => {
    return (
        <div>
            <Title title="Numbers" />
            <div>
            { persons.map(person => <Person key={person.id} person={person} filter={filter} persons={persons} delPerson={delPerson} /> ) }
            </div>
        </div>
    )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const hook = () => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
    }
    
    useEffect(hook, [])

    const delPerson = (person) => {
        if (!window.confirm(`Delete ${person.name}?`))
            return
        personsService
            .del(person.id)
            .then(
                response => {
                    const newPersons = persons.filter(n => n.id !== person.id)
                    setPersons(newPersons)
                }
            )
    }

  const addPhone = (event) => {
    event.preventDefault()
    // console.log('button clicked', event.target)
    const newPerson = {
        name:newName,
        number:newNumber
    }

    const itm = persons.find(person => person.name === newName)
    if (itm !== undefined) {
        let res = window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)
        if (!res) { 
            setNewPerson('')
            setNewNumber('')
            return 
        }
        else {
            personsService
                .replace(itm.id, newPerson)
                .then(
                    response => {
                        setPersons(persons.map(n => n.id !== itm.id ? n : response.data))
                    }
                )
            return
        }
    }

    personsService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewPerson('')
        setNewNumber('')
      })  
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewPerson(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }


  return (
    <div>
      <Filter handleFilterChange={handleFilterChange} filter={filter} />
      <NewPerson 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        newName={newName} 
        newNumber={newNumber} 
        addPhone={addPhone} 
      />
      <Display persons={persons} filter={filter} delPerson={delPerson} />
    </div>
  )
}

export default App