import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import Input from './components/Input'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const countriesToShow = !newFilter ? [] : countries.filter(country => country.name.toLowerCase().includes(newFilter))

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value.toLowerCase())
  }

  return (
    <div>
      <Input handleFilterChange={handleFilterChange} />
      <Countries countriesToShow={countriesToShow} />
    </div>
  )

}

const Countries = ({ countriesToShow }) => {
  if (countriesToShow.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countriesToShow.length === 1) {
    return (
      <Country country={countriesToShow[0]} />
    )
  } else {
    return (
      <div>
        {countriesToShow.map(country => (
          <CountryInfo key={country.area} country={country} />
        ))}
      </div>
    )
  }
}

const CountryInfo = ({ country }) => {
  const [display, setDisplay] = useState(false)
  return (
    <div>
      {country.name}
      <button onClick={() => setDisplay(!display)}>
        {display ? 'hide' : 'show'}
      </button>
      {display ? <Country country={country} /> : <div></div>}
    </div>
  )
}

export default App;
