// API address of the M-Media-Group Covid.
const BASE_URI = 'https://covid-api.mmediagroup.fr/v1/cases';

// Get data of a continent.
export const getContinent = async (continent) => {
  const response = await fetch(`${BASE_URI}?continent=${continent}`);
  return response.json();
};

// Get data of a single country.
export const getCountry = async (name) => {
  const response = await fetch(`${BASE_URI}?country=${name}`);
  return response.json();
};
