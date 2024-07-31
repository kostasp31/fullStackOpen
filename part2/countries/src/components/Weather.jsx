import { useState, useEffect } from 'react'
import axios from 'axios'

const WeatherInfo = ({city}) => {
  
    const [weather, setWeather] = useState(null);
  
    useEffect(() => {
        //   console.log('hi')
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_KEY}`
      axios
        .get(weatherUrl)
        .then (
          (response) => {
            setWeather(response.data)
            // console.log('a')
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

export default WeatherInfo