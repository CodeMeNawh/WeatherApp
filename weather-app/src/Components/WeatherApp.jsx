import sunny from "../assets/images/sunny.png"
import cloudy from "../assets/images/cloudy.png"
import rainy from "../assets/images/rainy.png"
import snowy from "../assets/images/snowy.png"
import loadingGif from "../assets/images/loading.gif"
import { useState, useEffect } from "react"



const WeatherApp = () => {
    const [data,setData] = useState({})
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);
    const api_key = "14e820022d576eb4a4ee9d427841f4af";  

    useEffect(() => {
        const fetchDefaultWeather = async ()=>{
            setLoading(true)
            const defaultLocation = "Warsaw"
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&appid=${api_key}`;
            const res = await fetch(url)
            const defaultData = await res.json()
            setData(defaultData);
            setLoading(false)
        }
        fetchDefaultWeather()
    },[])

    const handleInputChange = (e) => {
        setLocation(e.target.value)
    }

    const search = async() => {
        if(location.trim() !== ""){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api_key}`;
        const res = await fetch(url);
        const searchData = await res.json()
        
        if(searchData.cod !== 200){
            setData({notFound : true})
        }else{
            setData(searchData);
            setLocation('') 
        }
        setLoading(false)

        
    }
    
  }

  const handleKeyDown = (e) =>{
    if(e.key ==="Enter"){
        search()
    }
  }

  const weatherImages = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rainy,
    Snow: snowy,
    Haze: cloudy,
    Mist: cloudy,
  }
    const weatherCondition = data.weather?.[0]?.main || 'Clear';
    const weatherImage = weatherImages[weatherCondition] || sunny;

  const backgroundImages = {
    Clear: " linear-gradient(to right, #f3b07c, #fcd283)",
    Clouds: "linear-gradient(to right, #57d6d4, #71eeec)",
    Rain: "linear-gradient(to right, #5bc8fb, #80eaff)",
    Snow : "linear-gradient(to right, #aff2ff, #aff2ff)",
    Haze: "linear-gradient(to right, #57d6d4, #71eeec)",
    Mist: "linear-gradient(to right, #57d6d4, #71eeec)",
  }

  const backgroundImage = backgroundImages[weatherCondition];

  const locationName = data.name || 'Unknown Location';
  const temperature = data.main?.temp || 'N/A';
  
  const humidity = data.main?.humidity || 'Wet';
  const windSpeed = data.wind?.speed || 'Windy';

  const currentDate = new Date();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const month = months[currentDate.getMonth()];
  const dayOfMonth = currentDate.getDate();
  const formattedDate = `${dayOfWeek}  ${dayOfMonth}  ${month}`

  

  return (
    <div className="container" style={{backgroundImage}}>
        <div className="weather-app" style = {{backgroundImage: backgroundImage.replace("to right", "to top")}}>
            <div className="search">
                <div className="search-top">
                    <i className="fa-solid fa-location-dot"></i>
                    <div className="location">{locationName}</div>
                </div>
                <div className="search-bar">
                  <input type="text" placeholder="Enter Location" value={location} onChange={handleInputChange} onKeyDown={handleKeyDown} />  
                  <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
                </div>
            </div>
            {loading ? (<img className="loader" src="loadingGif" alt="loading"/>) : data.notFound ? (<div className="not-found">Not Found 😢</div>) : (
                <><div className="weather">
                <img src={weatherImage} alt="sunny" />
                <div className="weather-type">{weatherCondition}</div>
                <div className="temp">{temperature}°</div>
            </div>
            <div className="weather-date">
                <p>{formattedDate}</p>
            </div>
            <div className="weather-data">
                <div className="humidity">
                    <div className="data-name">Humidity</div>
                    <i className="fa-solid fa-droplet"></i>
                    <div className="data">{humidity}%</div>
                </div>
                <div className="wind">
                    <div className="data-name">Wind</div>
                    <i className="fa-solid fa-wind"></i>
                    <div className="data">{windSpeed} km/h</div>
                </div>
            </div></>
            )}
            

        </div>
    </div>
  )
}

export default WeatherApp