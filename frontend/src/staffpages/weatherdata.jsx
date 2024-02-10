import React, { useState, useEffect } from "react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      const apiKey = "1e83f73cc624c5a3fdf20c4eb0b3a261"; // Replace with your API key
      const url = `https://api.openweathermap.org/data/2.5/weather?q=Maidstone,UK&appid=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
      setIsLoading(false);
    };
    fetchWeather();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!weatherData) {
    return <p>Weather data not found for Maidstone, Kent.</p>;
  }

  const { main, weather } = weatherData;
  const temp = Math.round(main.temp - 273.15); // Convert kelvin to celsius
  const weatherIconCode = weather[0].icon;

  return (
    <div className="flex items-center justify-center p-4 space-x-2 bg-blue-500 rounded-lg shadow-md">
      <img
        src={`https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`}
        alt={weather[0].main}
        width={20}
        height={20}
      />
      <span className="text-4xl font-bold">{temp}°C</span>
    </div>
  );
};

export default Weather;
