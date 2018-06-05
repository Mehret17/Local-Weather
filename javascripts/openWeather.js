const dom = require('./dom');

let weatherKey = '';

const setKey = (key) => {
  weatherKey = key;
};

const searchOneDay = (zipCode) => {
  // const zipCode = $('#searchBar').val();
  // console.log('zipCode:', zipCode);
  return new Promise ((resolve, reject) => {
    $.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units=imperial&APPID=${weatherKey}`)
      .done((result) => {
        resolve(result);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

const searchFiveDay = (zipCode) => {
  // const zip = $('#searchBar').val();
  // console.log('zipCode:',zipcode);
  return new Promise ((resolve, reject) => {
    $.ajax(`http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&units=imperial&APPID=${weatherKey}`)
      .done((result) => {
        resolve(result);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

const showOneDayForecast = (searchText) => {
  searchOneDay(searchText)
    .then((result) => {
      dom.domString(result);
    })
    .catch((err) => {
      console.error('search error', err);
    });
};

const showFiveDayForecast = (searchTxt) => {
  searchFiveDay(searchTxt)
    .then((result) => {
      dom.fiveDayString(result.list);
    })
    .catch((err) => {
      console.error('search error', err);
    });
};
module.exports = {
  setKey,
  showOneDayForecast,
  showFiveDayForecast,
};
