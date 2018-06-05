const openWeather = require('./openWeather');

// const pressEnter = () => {
//   $(document).keypress((e) => {
//     console.log('e:',e);
//     if (e.key === 'Enter') {
//       const searchWord = $('#searchBar').val();
//       console.log(searchWord);
//       openWeather.showResults(searchWord);
//     }
//   });
// };

const oneDayButtonEvent = () => {
  $('#firstButton').on('click',(e) => {
    const searchWord = $('#searchBar').val();
    if (isNaN(searchWord) || searchWord < 5) {
      alert ('Please enter a valid US zip code');
    } else {
      console.log('searchWord:', searchWord);
      openWeather.showOneDayForecast(searchWord);
    };
  });
};

const fiveDayButtonEvent = () => {
  $('#secondButton').on('click', (e) => {
    const searchWord = $('#searchBar').val();
    if (isNaN(searchWord) || searchWord < 5) {
      alert ('Please enter a valid US zip code');
    } else {
      console.log('searchWord5:', searchWord);
      openWeather.showFiveDayForecast(searchWord);
    };
  });
};

const initializer = () => {
  oneDayButtonEvent();
  fiveDayButtonEvent();
};

module.exports = {
  initializer,
};
