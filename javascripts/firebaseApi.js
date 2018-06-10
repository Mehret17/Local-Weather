let firebaseConfig = {};
let uid = '';

const setConfig = (fbcConfig) => {
  firebaseConfig = fbcConfig;
};

const setUID = (newUID) => {
  uid = newUID;
};

const saveWeather = (newWeather) => {
  newWeather.uid = uid;
  console.log(newWeather);
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

const getAllWeather = () => {
  return new Promise((resolve, reject) => {
    const allWeatherArray = [];
    $.ajax({
      method: 'GET',
      url: `${firebaseConfig.databaseURL}/weather.json??orderBy="uid"&equalTo="${uid}"`,
    })
      .done((allWeatherObj) => {
        if (allWeatherObj !== null) {
          Object.keys(allWeatherObj).forEach((fbKey) => {
            allWeatherObj[fbKey].id = fbKey;
            allWeatherArray.push(allWeatherObj[fbKey]);
          });
        }
        resolve(allWeatherArray);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const deleteWeatherFromDb = (weatherId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'DELETE',
      url: `${firebaseConfig.databaseURL}/weather/${weatherId}.json`,
    })
      .done(() => {
        resolve();
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const updateWeatherIsScarryInDb = (updatedWeather, weatherId) => {
  updatedWeather.uid = uid;
  return new Promise ((resolve, reject) => {
    $.ajax({
      method: 'PUT',
      url: `${firebaseConfig.databaseURL}/weather/${weatherId}.json`,
      data: JSON.stringify(updatedWeather),
    })
      .done((modifiedWeather) => {
        resolve(modifiedWeather);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

module.exports = {
  setConfig,
  saveWeather,
  setUID,
  getAllWeather,
  deleteWeatherFromDb,
  updateWeatherIsScarryInDb,
};
