import axios from "axios";

const fetchCities = () => {
  const options = {
    method: "GET",
    url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
    headers: {
      "X-RapidAPI-Key": "4aa9b73f29msh054f16f33f85b5dp1f0a5djsn97399ea7a891",
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
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

export default fetchCities;
