import React, { useEffect, useReducer, useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import getWeatherData from "./api/weatherApi";
import Loader from "./components/Loader";
import { getGeoLocation } from "./utilities/getLocation";
import { useSelector, useDispatch } from "react-redux";
import { setMyLocation, setPinnedCords } from "./redux/weatherSlice";

export default function App() {
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [weatherSearched, setWeatherSearched] = useState(null);

  const myLocation = useSelector((state) => state.weather.myLocation);
  const pinnedCords = useSelector((state) => state.weather.pinnedCords);
  const dispatch = useDispatch()

  const onFocus = () => {
    setFocused(true);
  };
  const onBlur = () => {
    setFocused(false);
  };

  const fetchPinnedLocations = async (lat, lon, isMyLoc) => {
    setLoading(true);
    await getWeatherData({ lat: lat, lon: lon, units: "metric" }).then(
      (data) => {
        if (isMyLoc) dispatch(setMyLocation(data))
        else dispatch(setPinnedCords(data))
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    if (localStorage.hasOwnProperty('myLocation')) {
      let {lat, lon} = myLocation;
      fetchPinnedLocations(lat, lon, true);
    }
    else if (navigator.geolocation) {
        let { myLat, myLon } = getGeoLocation();
        dispatch(setMyLocation({myLat, myLon}))
        fetchPinnedLocations(myLat, myLon, true);
      }
  }, []);

  // useEffect(() => {
  //   console.log("my ", state.myLocation);
  // }, [state.myLocation]);
  // useEffect(() => {
  //   console.log("pinned", state.pinnedCords);
  // }, [state.pinnedCords]);

  const fetchWeather = async (city) => {
    setWaiting(true);
    await getWeatherData({ q: city, units: "metric" }).then((data) => {
      setWeatherSearched(data)
      setWaiting(false);
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
        {loading ? (
          <div className="flex justify-center scale-75">
            <Loader />
          </div>
        ) : (
          myLocation && (
            <div>
              <p className="font-medium my-4 mx-2 text-gray-200 opacity-50">
                Your current location
              </p>
              <WeatherCard weather={myLocation} nopin={true} />
              <hr className="w-80 mx-auto opacity-10" />
            </div>
          )
        )}
        <br />
        {loading ? (
          <div className="flex justify-center scale-75">
            <Loader />
          </div>
        ) : (
          pinnedCords && (
            <div>
              {
              pinnedCords.map((cords) => {
                (
                <WeatherCard weather={cords} nopin={false} />
              )})}
            </div>
          )
        )}
        {waiting ? (
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
