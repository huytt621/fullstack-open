import React from 'react'
import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
  const handleChange = (event) => dispatch(filterChange(event.target.value))
  const dispatch = useDispatch()

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter<input name="filter" onChange={handleChange} />
    </div>
  )
}

export default Filter