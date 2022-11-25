export const getGeoLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
	  return {lat, lon};
    });
  return false;
};
