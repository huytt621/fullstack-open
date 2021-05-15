import React from 'react'

const Input = ({ handleFilterChange }) => {
  return (
    <div>
      find countries <input onChange={handleFilterChange} />
    </div>
  )
}

export default Input