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

  // Define a function to get the background gif based on the weather
  const getBackgroundGif = (weather) => {
    switch (weather) {
      case 'Clear':
        return 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzBkY2J0Nnl6aXR6eWVkcmJ2bXVrdGxuamJzN29xYXgyM2RsNDE0NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3og0ICH4dOeWmrQMqA/giphy.gif';
      case 'Clouds':
        return 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXhnYnBwOTQwMnptazBvMmNueGdndW9saHFpcHh1Y2lnOHJneWpscCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dcJC4ypj9HuXC/giphy.gif';
      case 'Rain':
      case 'Drizzle': 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcms4Z2c3NDQ4c29icHBvZXJjdnU3ZXo5NGViZGxsbG1taTUzaDlidCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/P0ar8pIucRwje/giphy.gif'
        return 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcms4Z2c3NDQ4c29icHBvZXJjdnU3ZXo5NGViZGxsbG1taTUzaDlidCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/P0ar8pIucRwje/giphy.gif';
      case 'Mist':
        return 'url_of_your_rainy_weather_gif';
      case 'Thunderstorm':
        return 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTF3cHlqZWQ3ejAyM25vNnpqcGZmcmhtaTYyOXRhN3A2OXd4N3dzYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/13ZEwDgIZtK1y/giphy.gif';
      case 'Snow':
        return 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3JnZHo3cmhqOTU3YXN6bHU1MjM1NXFwY243enp0eHp1NHp1dnh5cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BDucPOizdZ5AI/giphy.gif';
      default:
        return 'url_of_your_default_weather_gif';
    }
  };

  const backgroundGif = getBackgroundGif(weather[0].main);

  return (
    <div style={{ backgroundImage: `url(${backgroundGif})`, backgroundSize: 'cover' }} className="flex items-center justify-center p-4 space-x-2 rounded-lg shadow-md">
    <img
      src={`https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`}
      alt={weather[0].main}
      width={50}
      height={50}
    />
    <span className="text-4xl font-bold text-white">{temp}°C</span>
    <span className="text-2xl font-bold text-white">{weather[0].main}</span>
  </div>
  );
};

export default Weather;
