const openWeather = require('./openWeather');
const apiKeys = () => {
  return new Promise ((resolve, reject) => {
    $.ajax('./db/apiKeys.json')
      .done((data) => {
        resolve(data.apiKeys);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

const retrieveKeys = () => {
  apiKeys()
    .then((results) => {
      openWeather.setKey(results.openWeather.apiKey);
      firebase.initializeApp(results.firebase);
    })
    .catch((err) => {
      console.error('retrieve err:',err);
    });
};

module.exports = {
  retrieveKeys,
};
