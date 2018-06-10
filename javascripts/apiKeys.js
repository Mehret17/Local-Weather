const openWeather = require('./openWeather');
const firebaseApi = require('./firebaseApi');
const {checkLoginStatus,} = require('./auth');
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
      firebaseApi.setConfig(results.firebase);
      firebase.initializeApp(results.firebase);
      checkLoginStatus();
    })
    .catch((err) => {
      console.error('retrieve err:',err);
    });
};

module.exports = {
  retrieveKeys,
};
