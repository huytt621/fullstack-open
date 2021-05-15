import React from 'react'
import Weather from './Weather'

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>
        <div>
          capital {country.capital}
        </div>
        <div>
          population {country.population}
        </div>
      </div>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img width="100px" src={country.flag} alt={country.name} />
      <Weather country={country.name} />
    </div>
  )
}

export default Country