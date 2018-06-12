const domString = (weatherArray) => {
  let strang = '';
  strang += `<div class="container">`;
  strang += `<div class ="row">`;
  strang += `<div class=""col-8 mx-auto weather">`;
  // strang += `<div class='thumbnail">`;
  // strang += `<div class="caption">`;
  strang += `<h4>Temperature: ${weatherArray.main.temp} °F</h4>`;
  strang += `<h3>${weatherArray.weather[0].description}</h3>`;
  strang += `<h3>${weatherArray.main.pressure} mp</h3>`;
  strang += `<h3>${weatherArray.wind.speed}  mph</h3>`;
  strang += `<h2>${weatherArray.name}</h2>`;
  strang += `<a class="btn btn-primary updateMovieToWatched" role="button">Save</a>`;
  strang += `</div>`;
  strang += `</div>`;
  strang += `</div>`;
  // strang += `</div>`;
  printToDom(strang);
};

const printToDom = (stringz) => {
  $('#currentForecast').append(stringz);
};

const fiveDayString = (weatherArray) => {
  let fiveDayStrang = '';
  weatherArray.forEach((weather, index) => {
    console.log('index:', index);
    if (index % 8 === 0) {
      fiveDayStrang += `<div class="container">`;
      // fiveDayStrang += `<div class="text-center">`;
      fiveDayStrang += `<div class="col-xs-6 col-md-3>`;
      fiveDayStrang += `<div class='thumbnail forecast">`;
      fiveDayStrang += `<h3 class ="temperature">Temperature: ${weather.main.temp} °F</h3>`;
      fiveDayStrang += `<h3 class ="description">${weather.weather[0].description}</h3>`;
      fiveDayStrang += `<h3 class ="pressure">${weather.main.pressure} mp</h3>`;
      fiveDayStrang += `<h3 class ="windSpeed">${weather.wind.speed}  mph</h3>`;
      // fiveDayStrang +=   `<h2>${weather.city.name}</h2>`;
      fiveDayStrang += `<a class="btn btn-primary saveWeather" role="button">Save</a>`;
      fiveDayStrang += `</div>`;
      fiveDayStrang += `</div>`;
      fiveDayStrang += `</div>`;
    };
  });
  print(fiveDayStrang);
};

const print = (allStringz) => {
  $('#fiveDayForecast').html(allStringz);
};

const saveString = (saveWeatherArray) => {
  let saveString = '';
  saveWeatherArray.forEach((weather) => {
    // saveString += `<div class="container">`;
    saveString += `<div class="text-center">`;
    saveString += `<div class="col-xs-6 col-md-3">`;
    if (weather.isScary === true) {
      saveString += `<div class="thumbnail forecast scary" data-firebase-id="${weather.id}">`;
    } else {
      saveString += `<div class="thumbnail forecast" data-firebase-id="${weather.id}">`;
    }
    // fiveDayStrang += `<div class="caption">`;
    saveString += `<h4 class ="temperature">${weather.temperature} </h4>`;
    saveString += `<h3 class ="description">${weather.condition}</h3>`;
    saveString += `<h3 class ="pressure">${weather.pressure}</h3>`;
    saveString += `<h3 class ="windSpeed">${weather.wind} </h3>`;
    saveString += `<button type="button" class="btn btn-danger deleteWeather">Delete</button>`;
    saveString += `<button type="button" class="btn btn-warning updateWeatherScary">Warning</button>`;
    // fiveDayStrang +=   `<h2>${weather.city.name}</h2>`;
    saveString += `</div>`;
    saveString += `</div>`;
    saveString += `</div>`;
    // saveString += `</div>`;
  });
  printSave(saveString);
};

const printSave = (stringz) => {
  $('#favoritesContainer').html(stringz);
};

module.exports = {
  domString,
  fiveDayString,
  saveString,
};
