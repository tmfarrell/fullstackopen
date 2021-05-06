
import React, { useState, useEffect } from 'react'
import axios from 'axios'


const CountryName = ({ country }) => {
  return (
    <li><b>{country.name}</b> ({country.region})</li>
  )
}

const Weather = ({ location, weather }) => {
  return (
    <div>
        <h4>Weather in {location}</h4>
        <p>temperature: {weather.temperature} deg. F</p>
        <p>wind: {weather.wind_speed} mph {weather.wind_dir}</p>
    </div>
  )
}

const CountryDetail = ({ country }) => {
  const [ weather, setWeather ] = useState([])
  const [ weatherAvailable, setWeatherAvailability ] = useState(false)

  useEffect(() => {
    const query = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHERSTACK_API_KEY}&query=${country.capital}&units=f`
    axios
      .get(query)
      .then(response => {
        if (response.data.hasOwnProperty('current')) {
            setWeather(response.data)
            setWeatherAvailability(true)
        }
      })
  }, [])

  const weather_content = weatherAvailable
    ? <Weather location={country.capital} weather={weather.current} />
    : <p>Weather data currently unavailable.</p>

  return (
    <div>
        <h3>{country.name}</h3>
        <ul>
            <li>capital: {country.capital}</li>
            <li>population: {country.population.toLocaleString()}</li>
            <li>languages:
                <ul>{country.languages.map(l => <li key={l.name}>{l.name}</li>)}</ul>
            </li>
        </ul>
        <img src={country.flag} style={{"height": "150px", "width": "300px"}} />

        {weather_content}
      </div>
  )
}

const Button = ({ showDetail, setShowDetail }) => {
    return (
        <button onClick={() => setShowDetail(!showDetail)}>
          {showDetail ? 'close' : 'show' }
        </button>
    )
}

const Country = ({ country }) => {
  const [showDetail, setShowDetail] = useState(false)

  const country_name_or_detail = (!showDetail)
    ?  <CountryName key={country.name} country={country} />
    :  <CountryDetail key={country.name} country={country} />

  return (
    <div>
        {country_name_or_detail}
        <Button showDetail={showDetail} setShowDetail={setShowDetail} />
    </div>
  )
}

const Countries = ({ countries }) => {
    if (countries.length === 1) {
        const country = countries[0]
        return (
            <div>
                <CountryDetail key={country.name} country={country} />
            </div>
        )
    } else if (countries.length <= 10) {
        return (
            <div>
                {countries.map(c => <Country key={c.name} country={c} />)}
            </div>
        )
    } else {
        return (
            <div>
                <p>Too many matches, please specify a more specific filter.</p>
            </div>
        )
    }
}

const FilterCountries = ({ someFilter, handleFilter }) => {
    return (
      <form>
        <div><input value={someFilter} onChange={handleFilter} /></div>
      </form>
    )
} ;

export { Countries, FilterCountries } ;