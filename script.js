$(document).ready(function() {

  const API_KEY = 'fa1c68d47bc5d297';

  function updateCityList(citiesData) {
    let list = $('#city-list');
    list.empty();
    citiesData.forEach(function(city) {
      list.append(`<li class="city" data-link="${city.l}">${city.name}, ${city.c}</li>`);
    });
  }

  function updateWeather(weatherData) {
    let conditions = $('#conditions');
    conditions.empty();
    conditions.append(`<h3>Weather Data for ${weatherData.display_location.city}</h3>`
      + `<h2>${weatherData.temperature_string}</h2>`
      + `Weather: ${weatherData.weather}<br/>UV Index: ${weatherData.UV}<br/>`
      + `Humidity: ${weatherData.relative_humidity}<br/>Wind: ${weatherData.wind_string}`
      + `<small>(${weatherData.observation_time})</small>`
    );
  }

  $('#city-input').on('keypress', function() {
    let query = $('#city-input').val();
    $.ajax({
      url : 'http://autocomplete.wunderground.com/aq?cb=test',
      data: { query: query },
      dataType : 'jsonp',
      jsonpCallback: 'test',
      success : function(parsed_json) {
        updateCityList(parsed_json.RESULTS)
      }
    });
  });

  $('#city-list').on('click', 'li', function(e) {
    let link = $(e.target).data('link');
    let url = 'http://api.wunderground.com/api/' + API_KEY + '/conditions/q/' + link + '.json';
    $.getJSON(url, function(resp) {
      console.log(resp);
      updateWeather(resp.current_observation);
    });
  });

});
