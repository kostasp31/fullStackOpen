import { useState } from 'react'

const Person = ({person, filter}) => {
    if (person.name.includes(filter)) {
        return (
            <div>
                {person.name} {person.number}
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

const Display = ({persons, filter}) => {
    return (
        <div>
            <Title title="Numbers" />
            <div>
            { persons.map(person => <Person key={person.id} person={person} filter={filter}/> ) }
            </div>
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
  const [filter, setFilter] = useState('')

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
      <Display persons={persons} filter={filter} />
    </div>
  )
}

export default App