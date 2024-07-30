import { useState, useEffect } from 'react'
import axios from 'axios'

const Language = ({lang}) => {
  return (
    <li>{lang}</li>
  )
}

const LanguageList = ({langs}) => {
  let langList = []
  for (let [key, value] of Object.entries(langs))
    langList = langList.concat({key, value})

  return (
    <div>
      <h2>Languages:</h2>
      <ul>{langList.map(ln => <Language lang={ln.value} key={ln.key} />)}</ul>
    </div>
  )
}

const InfoCountry = ({country}) => {
  console.log(country.languages)
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km^2</p>
      <LanguageList langs={country.languages} />
      <img src={country.flags.png} />
    </div>
  )
}

const Country = ({country}) => {
  let name = country.name.common
  
  return (
    <div>
      {/* {name} <button onClick={dispCountryinfo} >show</button> */}
      {name} <button>show</button>
    </div>
  )
}

const DisplayAll = ({countries, searchQ}) => {
  const filteredCountries = countries.filter(ct => ct.name.common.toLowerCase().includes(searchQ.toLowerCase()))
  if (filteredCountries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  else if (filteredCountries.length > 1) {
    return (
        <div>
            { filteredCountries.map(ct => <Country country={ct} key={filteredCountries.findIndex(obj => obj.name.common===ct.name.common)} /> ) }
        </div>
    )
  }
  else if (filteredCountries.length === 1) {
    // only one element in array
    return (
        <div>
          <InfoCountry country={filteredCountries[0]} />
        </div>
    )
  }
}


const App = () => {
  const [searchText, setSearchText] = useState('')
  const [countries, setCountries] = useState([])

  const searchTextChange = (event) => {
    setSearchText(event.target.value)
  }


  const hook = () => {
    const allDataUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
    axios
      .get(allDataUrl)
      .then(
        (response) => {
          setCountries(response.data);
          // countries.map(ct => {
          //   console.log(`${c}${ct.name.common}`)
          // })
        }
      )
  }
  useEffect(hook, [])

  return (
    <>
      Find Countries<form onSubmit={(event) => event.preventDefault()}>
            <input
            value={searchText}
            onChange={searchTextChange}
            />
        </form>
        <DisplayAll countries={countries} searchQ={searchText} />
    </>
  )
}

export default App
