import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import getWeatherData from "./api/weatherApi";
import Loader from "./components/Loader";

export default function App() {
  const [loading, setLoading] = useState({
    myLocation: false,
    weatherSearched: false,
  });
  const [weatherSearched, setWeatherSearched] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  const fetchMyLocation = async (lat, lon) => {
    setLoading({ ...loading, myLocation: true });
    await getWeatherData({ lat: lat, lon: lon, units: "metric" }).then(
      (data) => {
        setCurrentLocation(data);
        setLoading({ ...loading, myLocation: false });
      }
    );
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        fetchMyLocation(lat, lon);
      });
    }
  }, []);

  const fetchWeather = async (city) => {
    setLoading({ ...loading, weatherSearched: true });
    await getWeatherData({ q: city, units: "metric" }).then((data) => {
      setWeatherSearched(data);
      setLoading({ ...loading, weatherSearched: false });
    });
  };

  return (
    <div className="container">
      <div className="relative">
        <h1 className="relative z-50 font-bold text-4xl py-4">Weather</h1>
        <SearchBar onSearch={fetchWeather} />
      </div>
      <div className="weathers my-8 relative">
        <p className="font-medium my-4 mx-2 text-gray-200 opacity-50">
          Your current location
        </p>
        {loading.myLocation ? (
          <div className="flex justify-center scale-75">
            <Loader />
          </div>
        ) : (
          currentLocation && (
            <WeatherCard weather={currentLocation} nopin={true} />
          )
        )}
        <hr className="w-80 mx-auto opacity-10" />
        <br />
        {loading.weatherSearched ? (
          <div className="flex justify-center scale-75">
            <Loader />
          </div>
        ) : (
          weatherSearched && (
            <div>
              <WeatherCard weather={weatherSearched} />
            </div>
          )
        )}
      </div>
    </div>
  );
}
