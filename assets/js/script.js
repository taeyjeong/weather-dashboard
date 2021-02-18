$(document).ready(function() {
  $('#submit').on('click', function() {
    fetch( // FETCHING THE DATA FOR TODAY
      'https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=4f4fc4b2d81e48700fb99a35e316ea42'
    )
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      $('#city').html(data['name']) // INSERTING THE FETCHED CITY DATA
      $('#temp').html((((data['main']['temp'] - 273.15) * 9/5) + 32).toFixed(1) + "°F") // INSERTING THE FETCHED TEMP DATA
      $('#humid').html(data['main']['humidity'] + "%") // INSERTING THE FETCHED HUMIDITY DATA
      $('#wind').html((data['wind']['speed']) + "mph") // INSERTING THE FETCHED WIND SPEED DATA
      console.log(data)
    })
  })
})