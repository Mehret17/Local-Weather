const domString = (weatherArray) => {
  let strang = '';
  weatherArray.forEach((weather) => {
    strang += `<div class="col-sm-6 col-md-4">`;
    strang +=       `<h4>${weather.main.temp}</h4>`;
    strang +=       `<h3>${weather.description}</h3>`;
    strang +=       `<h3>${weather.main.pressure}</h3>`;
    strang +=       `<h3>${weather.wind.speed}</h3>`;
    strang += `</div>`;
  });
  printToDom(strang);
};

const printToDom = (stringz) => {
  $('#weatherContainer').html(stringz);
};

module.exports = {
  domString,
};
