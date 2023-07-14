module.exports.handler = async (event) => {
  const COUNTRIES_ENDPOINT = "https://countriesnow.space/api/v0.1/countries/capital"

  try {
    const response = await fetch(COUNTRIES_ENDPOINT);
    const dataObject = await response.json();

    // early return if api errors
    if (dataObject.error) {
      console.log("[external error]: ", error);

      return {
        statusCode: 500,
        body: null,
      }
    }

    // don't know api response structure, so assuming if no error then data is an array
    const { data } = dataObject;

    const [correctItem, incorrectItem1, incorrectItem2] = getCountryItems(data, 3);
    const answers = formatAnswers(correctItem, incorrectItem1, incorrectItem2);

    return {
      statusCode: 200,
      body: JSON.stringify({
        country: correctItem.country,
        answers
      }),
    }
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: null,
    };
  }
};

const getCountryItems = (data, count) => {
  const output = [];

  for (let i = 0; i < count; i += 1) {
    const index = Math.floor(Math.random() * data.length);
    const chosenItem = data[index];
  
    data.splice(index, 1);
    output.push({
      country: chosenItem.name,
      capital: chosenItem.capital,
    });
  }

  return output;
};

const formatAnswers = (correctItem, incorrectItem1, incorrectItem2) => {
  return [
    { capital: correctItem.capital, correct: true },
    { capital: incorrectItem1.capital, correct: false },
    { capital: incorrectItem2.capital, correct: false },
  ];
}
