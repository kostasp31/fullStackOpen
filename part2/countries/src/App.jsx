import { useState, useEffect } from 'react'
import axios from 'axios'

// To use api 
// set "VITE_WEATHER_KEY=3008005a520dc732ff0da8c60bb72599" && npm run dev
// from source: const api_key = import.meta.env.VITE_WEATHER_KEY

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

const WeatherInfo = ({city}) => {
  
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    console.log('hi')
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_KEY}`
    axios
      .get(weatherUrl)
      .then (
        (response) => {
          setWeather(response.data)
          console.log(response.data)
          console.log('a')
        }
      )
      .catch(
        (error)=> {
          console.log("Error")
          return null
        }
      )
  },[])


  if (weather === null) 
    return null

  const icon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  return (
    <div>
      <h1>Weather in {city}</h1>
      <p>Temperature: {weather.main.temp}<sup>o</sup>C</p>
      <img src={icon} />
      <p>Wind: {weather.wind.speed}m/s</p>
    </div>
  )
  
}

const InfoCountry = ({country}) => {
  // console.log(country.languages)
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km<sup>2</sup></p>  
      <LanguageList langs={country.languages} />
      <img src={country.flags.png} />
      <WeatherInfo city={country.capital} />
    </div>
  )
}

const Country = ({country, toggleVisibility}) => {
  let name = country.name.common

  if (country.display === true) {
    return (
      <div>
        {name} <button onClick={() => toggleVisibility(country)}>hide</button>
        <InfoCountry country={country} />
      </div>
    )
  }
  else {
    return (
      <div>
        {name} <button onClick={() => toggleVisibility(country)}>show</button>
      </div>
    )
  }
}

const DisplayAll = ({countries, searchQ, toggleVisibility}) => {
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
            { filteredCountries.map(ct => <Country country={ct} toggleVisibility={toggleVisibility} key={filteredCountries.findIndex(obj => obj.name.common===ct.name.common)} /> ) }
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
  const [visibilityChanged, setVisibility] = useState(false)
 
  const searchTextChange = (event) => {
    setSearchText(event.target.value)
  }

  const toggleVisibility = (country) => {
    country.display=!country.display
    setVisibility(!visibilityChanged)
  }
  
  const hook = () => {
    const allDataUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
    axios
    .get(allDataUrl)
    .then(
      (response) => {
        const newData = [...response.data]
        for (let key in newData) {
          newData[key].display=false
        }
        setCountries(newData)

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
        <DisplayAll countries={countries} searchQ={searchText} toggleVisibility={toggleVisibility} />
    </>
  )
}

export default App
