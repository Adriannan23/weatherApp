import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';

const WeatherBox = props => {

  const [weatherData, setWeatherData] = useState({});

  const handleCityChange = useCallback((city) => {
    console.log(city)

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8b57e8c62ff6803ac4e8696037a21103&units=metric`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const weatherData2 = {
          city: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].main
        };
        setWeatherData(weatherData2);
      });
  }, []);
  return (
    <section>
      <PickCity action={handleCityChange} />
      <WeatherSummary city={weatherData.city} temp={weatherData.temp} icon={weatherData.icon} description={weatherData.description} />
      <Loader />
    </section>
  )
};

export default WeatherBox;