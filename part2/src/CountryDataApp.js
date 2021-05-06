import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Countries, FilterCountries } from './components/Countries.js'


const CountryDataApp = () => {
  const [ countries, setCountries ] = useState([])
  const [ someFilter, setFilter ] = useState('')

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const countriesFiltered = countries.filter(c => c.name.includes(someFilter)).slice(0, 20)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <h1 style={{color: "red"}}>CountryDatabook</h1>

      <h2 style={{ color: "grey" }}>Filter Entries</h2>
      <FilterCountries someFilter={someFilter} handleFilter={handleFilter} />

      <h2 style={{ color: "grey" }}>Countries</h2>
      <Countries countries={countriesFiltered} />

    </div>
  )
} ;

export default CountryDataApp ;
