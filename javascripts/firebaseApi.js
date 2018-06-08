let firebaseConfig = {};

const setConfig = (fbcConfig) => {
  firebaseConfig = fbcConfig;
};

const saveWeather = (newWeather) => {
  return new Promise ((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: `${firebaseConfig.databaseURL}/weather.json`,
      data: JSON.stringify(newWeather),
    })
      .done((uniqueArray) => {
        resolve(uniqueArray);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

module.exports = {
  setConfig,
  saveWeather,
};
