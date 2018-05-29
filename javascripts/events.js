const openWeather = require('./openWeather');

const pressEnter = () => {
  $(document).keypress((e) => {
    console.log('e:',e);
    if (e.key === 'Enter') {
      const searchWord = $('#searchBar').val();
      console.log(searchWord);
      openWeather.showResults(searchWord);
    }
  });
};

const initializer = () => {
  pressEnter();
};

module.exports = {
  initializer,
};
