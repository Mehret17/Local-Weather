const dom = require('./dom');

let weatherKey = '';

const setKey = (key) => {
  weatherKey = key;
};

const searchZip = (txt) => {
  return new Promise ((resolve, reject) => {
    $.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${txt},us&appid=${weatherKey}&units=imperial`)
      .done((result) => {
        resolve(result.results);
      })
      .fail((err) => {
        reject(err);
      });
  });
};

const showResults = (searchText) => {
  searchZip(searchText)
    .then((result) => {
      dom.domString(result);
    })
    .catch((err) => {
      console.error('search error', err);
    });
};

module.exports = {
  showResults,
  setKey,
};
