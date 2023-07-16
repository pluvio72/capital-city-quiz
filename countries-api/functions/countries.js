const COUNTRIES_ENDPOINT = "https://countriesnow.space/api/v0.1/countries/capital";

module.exports.fetchCountries = async () => {
  try {
    const response = await fetch(COUNTRIES_ENDPOINT);
    const parsedData = await response.json();

    if (parsedData.error) {
      console.log("[external error]: ", error);
      return null;
    }

    // don't know api response structure, so assuming if no error then data is an array
    const { data } = parsedData;

    // remove any items without capitals
    return data.filter(item => item.capital);
  } catch (error) {
    console.error('[fetchCountries]:', error);
    return null;
  }
};