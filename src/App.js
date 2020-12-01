import React, { useState } from 'react';
const api = {
  key: "30a258d0f8dd82246a42018f77d584c9",
  base: " https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  const search = evt => {
    if(evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={
      (typeof weather.main != "undefined") ? (
        (weather.main.temp>15 && weather.main.temp<25) ? "app warm" : 
        (weather.main.temp>=25) ? "app autumn" : 
        (weather.main.temp<=15) ? "app cold" : 
        "app"):
        'app'
      }>
      <main>
        <div className="search-box">
          <input
           type="text"
           className="search-bar"
           placeholder="Search..."
           onChange={e => setQuery(e.target.value)}
           value={query}
           onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}<span>&#8451;</span>
            </div>
            <div className="weather">
              {weather.weather[0].main}<br/>
            </div>
            <div className="description">
              {weather.weather[0].description}
            </div>
          </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
