import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ success, setSuccess ] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(p => p.name.toLowerCase()).includes(newName.toLowerCase())) {
      const person = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
      changeNumber(person)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setSuccess(true)
          setMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.concat(returnedPerson))
        })
        .catch(error => {
          setSuccess(false)
          setMessage(error.response.data)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.name !== newName))
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const changeNumber = (person) => {
      if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
        const newPerson = { ...person, number: newNumber }
        personService
          .update(person.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id === returnedPerson.id ? returnedPerson : p))
          })
          .catch(error => {
            setSuccess(false)
            setMessage(`Information of ${person.name} has already been removed from server`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== person.id))
          })
      }
  }

  const handleNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    event.preventDefault()
    setNewFilter(event.target.value)
  }

  const handleDeletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`delete ${person.name} ?`)) {
      personService
        .remove(id)
      setPersons(persons.filter(p => p.id !== id))
    }
  }

  const personsToShow = persons.filter(p => p.name.toLowerCase().includes(newFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} success={success} />
      <Filter filter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} name={newName} handleNameChange={handleNameChange} number={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={handleDeletePerson} />
    </div>
  )
}

export default App