import "./Weather.css";
import { useState } from "react";

const Weather = () => {
    let ar1=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let ar2=['jan','feb','march','april','may','june','july','aug','sep','oct','nov','dec']
  const [val, handleval] = useState('');
  const [wet, handlewet] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const search = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=db643e2a84590c6269def12673dc8356`;
      let res = await fetch(url);
      let data = await res.json();
      const obj = {
        main: data.weather[0].main,
        des: data.weather[0].description,
        icon: data.weather[0].icon,
        speed: data.wind.speed,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        temp:data.main.temp
      };
      setWeatherData(obj);
    } catch (er) {
      console.log(er);
    }
  };

  const renderWeatherData = () => {
    if (!weatherData) {
      return null;
    }
let mn=ar2[new Date().getMonth()];
let day=ar1[new Date().getDay()];
let date=new Date().getDate();
let yr=new Date().getFullYear();
    return (
      <div className="box2 widget">
        <div className='imgs'>
          <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@4x.png`} alt="weather-image" />
        </div>
        <div className='mausm'>
        <div className="im">
          <img src={process.env.PUBLIC_URL + '/temperature.png'} alt="temp"  className='mn2'/>
          </div>
          <div className="m1">
            <h1>{weatherData.main}</h1>
            <h3>{weatherData.temp}&deg;</h3>
          </div>
          <div className="m2" ><span>{`${date} ${mn} ${yr}`}</span>
          <p>{day}</p></div>
        </div>
        <div className="items">
        
          <div className="is">
          <div className="im">
          <img src={process.env.PUBLIC_URL + '/humidity.png'} alt="Breeze"  className='mehn'/>
          </div>
            <div>
      
              <span>Humidity</span>
              <p>{weatherData.humidity}</p>
            </div>
          </div>
          <div className="is">
          <div className="im">
          <img src={process.env.PUBLIC_URL + '/breeze.png'} alt="Breeze"  className='mehn'/>
          </div>
            <div>
              <span>Pressure</span>
              <p>{weatherData.pressure}</p>
            </div>
          </div>
          <div className="is">
          <div className="im">
          <img src={process.env.PUBLIC_URL + '/storm.png'} alt="Breeze"  className='mehn'/>
          </div>
            <div>
              <span>Wind</span>
              <p>{weatherData.speed}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="box">
      <div className="box1">
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Enter the city" aria-label="Recipient's username" aria-describedby="button-addon2" value={val} onChange={(e) => handleval(e.target.value)} />
          <button type="button" className="btn btn-primary" onClick={search}>Search</button>
        </div>
      </div>
      {renderWeatherData()}
    </div>
  );
};

export default Weather;
