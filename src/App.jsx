import React from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

export default function App() {
  return (
    <div className="container">
      <div className="relative">
        <h1 className="font-bold text-4xl py-4">Weather</h1>
        <SearchBar />
          <div className="absolute -bottom-4 left-20 w-60 h-60 bg-teal-300 rounded-full mix-blend-screen filter blur-3xl opacity-20 -z-10 animate-blob"></div>
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-screen filter blur-3xl opacity-20 -z-10 animate-blob "></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-screen filter blur-3xl opacity-20 -z-10 animate-blob"></div>
      </div>
      <div className="weathers my-8 relative">
        <WeatherCard />
        <WeatherCard />
        <WeatherCard />
      </div>
    </div>
  );
}
