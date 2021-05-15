import React from 'react'

const Persons = (props) => {
  return (
    <div>
      {props.persons.map(p => <Person person={p} handleDelete={() => props.handleDelete(p.id)} key={p.name} />)}
    </div>
  )
}

const Person = ({ person, handleDelete }) => {
  return (
    <div>
      {`${person.name} ${person.number}`} 
      <button onClick={handleDelete}>delete</button>
    </div>
  )
}

export default Persons