import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = props => {

  const [weatherData, setWeatherData] = useState('');

  const [pending, setPending] = useState(false);

  const [error, setError] = useState(false);

  const handleCityChange = useCallback((city) => {
    setPending(true);
    setError(false);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8b57e8c62ff6803ac4e8696037a21103&units=metric`)
      .then((res) => {
        if (res.status === 200) {
          return res.json().then(data => {
            const weatherData2 = {
              city: data.name,
              temp: data.main.temp,
              icon: data.weather[0].icon,
              description: data.weather[0].main,
            };
            setWeatherData(weatherData2);
            setPending(false);
          });
        } else {
          setError(true);
        }
      });
  }, []);


  return (
    <section>
      <PickCity action={handleCityChange} />
      {weatherData && !pending && <WeatherSummary {...weatherData}
      />}
      {!error && pending && <Loader />}
      {error && <ErrorBox />}
    </section>
  )
};

export default WeatherBox;