const { fetchCountries } = require('./countries');
const { shuffle } = require('../util');

module.exports.handler = async (event) => {
  try {
    const data = await fetchCountries();

    // early return if api errors
    if (!data) {
      return {
        statusCode: 500,
        body: null,
      }
    }

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
  return shuffle([
    { capital: correctItem.capital },
    { capital: incorrectItem1.capital },
    { capital: incorrectItem2.capital },
  ]);
};

module.exports.fetchCountries = fetchCountries;
