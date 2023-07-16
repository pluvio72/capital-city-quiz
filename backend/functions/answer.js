const { fetchCountries } = require('./countries');

module.exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    if (!body.country || !body.answer) {
      return {
        statusCode: 500,
        body: null,
      };
    }

    const data = await fetchCountries();

    // early return if api errors
    if (!data) {
      return {
        statusCode: 500,
        body: null,
      };
    }

    const result = data.find(
      (item) => item.name === body.country
    );

    const correct = result.capital === body.answer;

    return {
      statusCode: 200,
      body: JSON.stringify({
        correct,
        answer: result.capital,
      }),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: null,
    };
  }
};
