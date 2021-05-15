import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
  const [weather, setWeather] = useState([])

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country}`)
      .then(response => setWeather(response.data))
  })

  const checker = weather && weather.current

  return (
    <div>
      <h2>Weather in {country}</h2>
      <div>
        <strong>temperature:</strong> {checker && weather.current.temperature} celsius
        <br />
        <img src={checker && weather.current.weather_icons[0]} alt={`current condition is ${checker && weather.current.weather_descriptions[0]}`}/>
        <br />
        <strong>wind:</strong> {checker && weather.current.wind_speed} mph direction {checker && weather.current.wind_dir}
      </div>
    </div>
  )
}

export default Weather