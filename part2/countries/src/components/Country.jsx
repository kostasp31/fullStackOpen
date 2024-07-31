import WeatherInfo from './Weather'
import LanguageList from './Language'

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
          <hr />
        </div>
      )
    }
    else {
      return (
        <div>
          {name} <button onClick={() => toggleVisibility(country)}>show</button>
          <hr />
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

export default DisplayAll