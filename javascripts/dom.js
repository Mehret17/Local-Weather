const domString = (weatherArray) => {
  let strang = '';
  strang += `<div class="container">`;
  strang += `<div class ="row">`;
  strang += `<div class=""col-8 mx-auto weather">`;
  // strang += `<div class='thumbnail">`;
  // strang += `<div class="caption">`;
  strang +=   `<h4>Temperature: ${weatherArray.main.temp} °F</h4>`;
  strang +=   `<h3>${weatherArray.weather[0].description}</h3>`;
  strang +=   `<h3>${weatherArray.main.pressure} mp</h3>`;
  strang +=   `<h3>${weatherArray.wind.speed}  mph</h3>`;
  strang +=   `<h2>${weatherArray.name}</h2>`;
  strang += `</div>`;
  strang += `</div>`;
  strang += `</div>`;
  // strang += `</div>`;
  printToDom(strang);
};

const printToDom = (stringz) => {
  $('#weatherContainer').append(stringz);
};

const fiveDayString = (weatherArray) => {
  let fiveDayStrang = '';
  weatherArray.forEach((weather, index) => {
    console.log('index:',index);
    if (index % 8 === 0) {
      fiveDayStrang += `<div class="row text-center">`;
      fiveDayStrang += `<div class="col-sm-6 col-md-4">`;
      // fiveDayStrang += `<div class='thumbnail">`;
      // fiveDayStrang += `<div class="caption">`;
      fiveDayStrang +=   `<h4>Temperature: ${weather.main.temp} °F</h4>`;
      fiveDayStrang +=   `<h3>${weather.weather[0].description}</h3>`;
      fiveDayStrang +=   `<h3>${weather.main.pressure} mp</h3>`;
      fiveDayStrang +=   `<h3>${weather.wind.speed}  mph</h3>`;
      // fiveDayStrang +=   `<h2>${weather.city.name}</h2>`;
      fiveDayStrang += `</div>`;
      fiveDayStrang += `</div>`;
      // fiveDayStrang += `</div>`;
      // fiveDayStrang += `</div>`;
    };
  });
  print(fiveDayStrang);
};

const print = (allStringz) => {
  $('#weatherContainer').append(allStringz);
};

module.exports = {
  domString,
  fiveDayString,
};
