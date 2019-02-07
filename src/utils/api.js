export const getCountries = name => {
  return fetch(`https://restcountries.eu/rest/v2/name/${name}`)
    .then(response => response.json());
};