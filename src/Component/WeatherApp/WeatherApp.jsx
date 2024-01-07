import React, { useState } from 'react';
import './WeatherApp.css';
import searchIcon from '../Assets/search.png';
import clearIcon from '../Assets/clear.png';
import cloudIcon from '../Assets/cloud.png';
import drizzleIcon from '../Assets/drizzle.png';
import rainIcon from '../Assets/rain.png';
import humidityIcon from '../Assets/humidity.png';
import snowIcon from '../Assets/snow.png';
import windIcon from '../Assets/wind.png';

const iconMapping = {
    '01d': clearIcon,
    '01n': clearIcon,
    '02d': cloudIcon,
    '02n': cloudIcon,
    '03d': drizzleIcon,
    '03n': drizzleIcon,
    '04d': drizzleIcon,
    '04n': drizzleIcon,
    '09d': rainIcon,
    '09n': rainIcon,
    '10d': rainIcon,
    '10n': rainIcon,
    '13d': snowIcon,
    '13n': snowIcon,
};

export default function WeatherApp() {
    const api_key = '5e98457938315b01eb45546fa2197a50';
    const [wicon, setWicon] = useState(cloudIcon);

    const search = async () => {
        try {
            const element = document.getElementsByClassName('cityInput');
            if (element[0].value === '') {
                return 0;
            }

            const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${api_key}&units=metric`;

            const response = await fetch(url);
            const data = await response.json();

            const humidity = document.getElementsByClassName('himidity-percent');
            const wind = document.getElementsByClassName('wind-rate');
            const temperature = document.getElementsByClassName('weather-temp');
            const location = document.getElementsByClassName('weather-location');

            humidity[0].innerHTML = `${data.main.humidity} %`;
            wind[0].innerHTML = `${Math.floor(data.wind.speed)} km/h`;
            temperature[0].innerHTML = `${Math.floor(data.main.temp)}°C`;
            location[0].innerHTML = data.name;

            const iconCode = data.weather[0].icon;
            setWicon(iconMapping[iconCode] || cloudIcon);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            // Handle error gracefully, show a message to the user, etc.
        }
    };

    return (
        <div className="container">
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder="Search" />
                <div className="search-icon" onClick={() => { search(); }}>
                    <img src={searchIcon} alt="Search" />
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt="Weather Icon" />
            </div>
            <div className="weather-temp">24°C</div>
            <div className="weather-location">Bangalore</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidityIcon} alt="Humidity Icon" className="icon" />
                    <div className="data">
                        <div className="himidity-percent">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={windIcon} alt="Wind Icon" className="icon" />
                    <div className="data">
                        <div className="wind-rate">18 km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
}



