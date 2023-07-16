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
    let itemFound = false;
    let chosenItem, index;

    // dangerous using a while loop here could probably have a max number of tries instead
    // then FE would need to also catch if this fails and not render an empty answer
    while (!itemFound) {
      index = Math.floor(Math.random() * data.length);
      chosenItem = data[index];

      if (chosenItem.capital) {
        itemFound = true;
      }
    }
  
    data.splice(index, 1);
    output.push({
      country: chosenItem.name,
      capital: chosenItem.capital,
    });
  }

  return output;
};

const formatAnswers = (correctItem, incorrectItem1, incorrectItem2) => {
  return (
      [
        { capital: correctItem.capital, correct: true },
        { capital: incorrectItem1.capital, correct: false },
        { capital: incorrectItem2.capital, correct: false },
      ]
    );
}

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}