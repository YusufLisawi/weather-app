export const getPinnedFromStorage = () => {
  var values = [],
    keys = Object.keys(localStorage),
    i = 0;
  
    console.log("keys => ", keys);

  while (++i < keys.length) {
    values.push(JSON.parse(localStorage.getItem(keys[i])));
  }

  return values;
};
