import React, { useEffect, useState } from "react";
import Tilty from "react-tilty";
import { formatToLocalTime } from "../api/weatherApi";
import { AiTwotonePushpin } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setPinnedCords } from "../redux/weatherSlice";

export default function WeatherCard({
  weather: { lat, lon, dt, timezone, name, description, temp, details },
  nopin,
  weather,
}) {
  const [shadow, setShadow] = useState(false);
  const [expand, setExpand] = useState(false);
  console.log(weather);

  function showShadow() {
    setShadow(true);
  }
  function hideShadow() {
    setShadow(false);
  }

  function toCapitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="relative z-50">
      {/* <Tilty max={10}> */}
      <div
        className={`duration-300 absolute bg-gray-200 -z-10 inset-8 filter blur-3xl ${
          !shadow ? "opacity-0" : "opacity-60"
        }`}
      ></div>
      <div
        className="mb-5 cursor-pointer weather-card py-3 px-5 w-full rounded-3xl relative overflow-hidden"
        onMouseOver={() => showShadow()}
        onMouseLeave={() => hideShadow()}
      >
        <div className="layer"></div>
        <img
          className="absolute inset-0 rounded -translate-y-4 -z-10"
          src="https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2148&q=80"
          alt={details}
        />
        <div className="relative">
          <div
            className={`flex justify-between mb-5 ${
              expand && "mt-3 flex-col text-center"
            } duration-100`}
          >
            <div>
              <h1 className={`text-4xl font-semibold text-shadow duration-100`}>
                {name}
              </h1>
              <p
                className={`font-bold text-shadow ${
                  expand ? "opacity-100 text-lg" : "opacity-60"
                } duration-100`}
              >
                {formatToLocalTime(dt, timezone, "hh:mm a")}
              </p>
            </div>
            <h1 className="text-6xl font-medium relative text-shadow">
              <span className="absolute inset-0 left-20">˚</span>
              {Math.ceil(temp)}
            </h1>
          </div>

          {/* <div className="font-medium flex justify-between items-center">
            <p className="opacity-70">{toCapitalize(description)}</p>
            <div>
              {!nopin  && (
                <p
                  className="duration-300 hover:scale-150 active:scale-50"
                >
                  <AiTwotonePushpin size={22} />
                </p>
              )}
            </div>
          </div> */}
        </div>
      </div>
      {/* </Tilty> */}
    </div>
  );
  return;
}
