// import axios from "axios";

// const API_KEY = "1421fdd53f1f23530c9e6d68843277c1";
// const BASE_URL = "https://api.openweathermap.org/data/2.5/";

// const getData = (infoType, searchParams) => {
//   const url = new URL(BASE_URL + infoType);
//   url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

//   return axios.get(url)
//     .then((res) => res.data);
// };

// const getWeatherData = (searchParams) => {
// 	const currentWeather = await getData('weather')
// }

import axios from "axios";

const getWeather = () => {
  const options = {
    method: "GET",
    url: "https://forecast9.p.rapidapi.com/rapidapi/forecast/Berlin/summary/",
    headers: {
      "X-RapidAPI-Key": "4aa9b73f29msh054f16f33f85b5dp1f0a5djsn97399ea7a891",
      "X-RapidAPI-Host": "forecast9.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};
