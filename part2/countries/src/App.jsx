import { useState, useEffect } from 'react'
import axios from 'axios'
import DisplayAll from './components/Country'

// To use api 
// set "VITE_WEATHER_KEY=3008005a520dc732ff0da8c60bb72599" && npm run dev
// from source: const api_key = import.meta.env.VITE_WEATHER_KEY
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
