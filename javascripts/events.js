const openWeather = require('./openWeather');
const firebaseApi = require('./firebaseApi');
const dom = require('./dom');

const myLinks = () => {
  $(document).click((e) => {
    console.log('e:',e);
    if (e.target.id === 'authenticate') {
      $('#search').addClass('hide');
      $('#myFavorites').addClass('hide');
      $('#authScreen').removeClass('hide');
    } else if (e.target.id === 'mine') {
      $('#search').addClass('hide');
      $('#myFavorites').removeClass('hide');
      $('#authScreen').addClass('hide');
      getAllWeatherEvent();
    } else if (e.target.id === 'navSearch') {
      $('#myFavorites').addClass('hide');
      $('#search').removeClass('hide');
      $('#authScreen').addClass('hide');
    };
  });
};

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
  $('#currentButton').on('click',(e) => {
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
  $('#fiveDayButton').on('click', (e) => {
    const searchWord = $('#searchBar').val();
    if (isNaN(searchWord) || searchWord < 5) {
      alert ('Please enter a valid US zip code');
    } else {
      console.log('searchWord5:', searchWord);
      openWeather.showFiveDayForecast(searchWord);
    };
  });
};

const getAllWeatherEvent = () => {
  firebaseApi.getAllWeather()
    .then((weatherArray) => {
      dom.saveString(weatherArray);
    })
    .catch((error) => {
      console.error('error in get all weather', error);
    });
};

const saveWeatherEvent = () => {
  $(document).on('click', '.saveWeather',(e) => {
    console.log('saveWeather:',e);
    const weatherToAddCard = $(e.target).closest('.forecast');
    const weatherToAdd = {
      temperature: weatherToAddCard.find('.temperature').text(),
      condition: weatherToAddCard.find('.description').text(),
      pressure: weatherToAddCard.find('.pressure').text(),
      wind: weatherToAddCard.find('.wind').text(),
      isScarry: true,
    };
    firebaseApi.saveWeather(weatherToAdd);
    // .then(() => {
    //   weatherToAddCard.remove();
    // })
    // .catch((error) => {
    //   console.error('error in saving weather', error);
    // });
  });
};

const initializer = () => {
  myLinks();
  oneDayButtonEvent();
  fiveDayButtonEvent();
  saveWeatherEvent();
};

module.exports = {
  initializer,
};
