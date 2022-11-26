import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import getWeatherData from "./api/weatherApi";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";

export default function App() {
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState({
    myLocation: false,
    pinnedCords: false,
    weatherSearched: false,
  });
  const [weatherSearched, setWeatherSearched] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [pinnedLocations, setPinnedLocations] = useState([]);
  const pinnedCords = useSelector((state) => state.weather.pinnedCords);

  console.log(pinnedCords)

  const onFocus = () => {
    setFocused(true);
  };
  const onBlur = () => {
    setFocused(false);
  };

  const fetchMyLocation = async (lat, lon) => {
    setLoading({ ...loading, myLocation: true });
    await getWeatherData({ lat: lat, lon: lon, units: "metric" }).then(
      (data) => {
        setCurrentLocation(data);
        setLoading({ ...loading, myLocation: false });
      }
    );
  };
  const fetchPinnedLocations = async (lat, lon) => {
    setLoading({ ...loading, pinnedCords: true });
    await getWeatherData({ lat: lat, lon: lon, units: "metric" }).then(
      (data) => {
        setPinnedLocations([...pinnedLocations, data]);
        setLoading({ ...loading, pinnedCords: false });
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
    pinnedCords.forEach((cord) => {
      fetchPinnedLocations(cord.lat, cord.lon);
    });
  }, []);


  // useEffect(() => {
  //   if (pinnedCords.at(-1))
  //     fetchPinnedLocations(pinnedCords.at(-1).lat, pinnedCords.at(-1).lon);
  // }, [pinnedCords])

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
        <SearchBar
          onSearch={fetchWeather}
          onFocuss={onFocus}
          onBlurr={onBlur}
        />
        <div className={!focused ? "animate-pulseslow" : ""}>
          <div className="absolute -bottom-4 left-20 w-60 h-60 bg-teal-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 -z-10 animate-blob"></div>
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 -z-10 animate-blob "></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 -z-10 animate-blob"></div>
        </div>
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
        {loading.pinnedCords ? (
          <div className="flex justify-center scale-75">
            <Loader />
          </div>
        ) : (
          pinnedLocations && (
            <div className="pinnedWeathers">
              {pinnedLocations.map((wcords) => (
                <WeatherCard weather={wcords} key={wcords.name}/>
              ))}
            </div>
          )
        )}
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
