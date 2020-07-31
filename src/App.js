import React, {useState} from 'react';
import './App.css';
const api = {
  key: 'd0d8783997386500229ba9ab6c7e7592',
  base: 'https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/'
}
function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = e => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        //console.log(weather.main.temp);
      })
      .catch(err =>{
        return err;
      });
    }
  }

  return (
    
    <div className={(weather.main && weather.main.temp > 16) ? 'app warm': 'app'}>
      <main>
        <div className='heading'><h1> Welcome to Weather Tracker</h1></div>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='Search your location...'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {weather.main ? 
        (
          <div>
            <div className='location-box'>
              <div className='location'>{weather.name}, {weather.sys.country}</div>
              <div className='date'>{new Date().toDateString()}</div>
            </div>

            <div className='weather-box'>
              <div className='temp'>{Math.round(weather.main.temp)}*C</div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </div>
        )
        : null
        }
      </main>
    </div>
  );
}

export default App;
