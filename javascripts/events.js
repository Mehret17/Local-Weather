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

const saveWeatherEvent = () => {
  $(document).on('click', '.saveWeather',(e) => {
    console.log('saveWeather:',e);
    const weatherToAddCard = $(e.target).closest('.forecast');
    const weatherToAdd = {
      temperature: weatherToAddCard.find('.temperature').text(),
      condition: weatherToAddCard.find('.description').text(),
      pressure: weatherToAddCard.find('.pressure').text(),
      wind: weatherToAddCard.find('.windSpeed').text(),
      isScarry: false,
    };
    firebaseApi.saveWeather(weatherToAdd);
  });
};

const getAllWeatherEvent = () => {
  firebaseApi.getAllWeather()
    .then((saveArray) => {
      dom.saveString(saveArray);
    })
    .catch((error) => {
      console.error('error in get all weather', error);
    });
};

const deleteWeatherFromFirebase = () => {
  $(document).on('click', '.deleteWeather', (e) => {
    const weatherToDeleteId = $(e.target).closest('.forecast').data('firebaseId');
    console.log('deleteEvent:',e);
    firebaseApi.deleteWeatherFromDb(weatherToDeleteId)
      .then(() => {
        getAllWeatherEvent();
      })
      .catch((error) => {
        console.error('error from delete weather', error);
      });
  });
};

const updateWeatherEvent = () => {
  $(document).on('click', '.updateWeatherScarry', (e) => {
    const weatherToUpdateId = $(e.target).closest('.forecast').data('firebaseId');
    const weatherToUpdateCard = $(e.target).closest('.forecast');
    const updateWeather = {
      temperature: weatherToUpdateCard.find('.temperature').text(),
      condition: weatherToUpdateCard.find('.description').text(),
      pressure: weatherToUpdateCard.find('.pressure').text(),
      wind: weatherToUpdateCard.find('.windSpeed').text(),
      isScarry: true,
    };
    firebaseApi.updateWeatherIsScarryInDb(updateWeather, weatherToUpdateId)
      .then(() => {
        getAllWeatherEvent();
      })
      .catch((error) => {
        console.error('error in update movie',error);
      });
  });
};

const authEvents = () => {
  $('#signin-btn').click((e) => {
    e.preventDefault();
    const email = $('#inputEmail').val();
    const password = $('#inputPassword').val();
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  });

  $('#register-btn').click(() => {
    const email = $('registerEmail').val();
    const password = $('#registerPassword').val();
    firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
      const errorMessage = error.message;
      console.error(errorMessage);
    });
  });

  $('#register-link').click(() => {
    $('#login-form').addClass('hide');
    $('#register-link').removeClass('.hide');
  });

  $('#signin-link').click(() => {
    $('#login-form').removeClass('hide');
    $('#registration-form').addClass('hide');
  });
  $('#logout').click(() => {
    firebase.auth().signOut().then(() => {
    }).catch((error) => {
      console.error(error);
    });
  });
};

const initializer = () => {
  myLinks();
  oneDayButtonEvent();
  fiveDayButtonEvent();
  saveWeatherEvent();
  deleteWeatherFromFirebase();
  updateWeatherEvent();
  authEvents();
};

module.exports = {
  initializer,
  getAllWeatherEvent,
};
