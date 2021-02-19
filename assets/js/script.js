$(document).ready(function() {
  $('#submit').on('click', function() {
    fetch( // FETCHING THE DATA FOR TODAY
      'https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=4f4fc4b2d81e48700fb99a35e316ea42'
    )
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var iconcode = data['weather']['0']['icon'] // OBTAINING THE ICON FILE NAME
      var iconurl = "http://openweathermap.org/img/w/"+iconcode+".png"; // OBTAINING THE SOURCE FOR ICON IMAGE
      $('#wicon').attr('src', iconurl) // INSERTING THE ICON IMAGE
      $('#city').html(data['name']) // INSERTING THE FETCHED CITY DATA
      $('#temp').html((((data['main']['temp'] - 273.15) * 9/5) + 32).toFixed(1) + "°F") // INSERTING THE FETCHED TEMP DATA
      $('#humid').html(data['main']['humidity'] + "%") // INSERTING THE FETCHED HUMIDITY DATA
      $('#wind').html((data['wind']['speed']) + "mph") // INSERTING THE FETCHED WIND SPEED DATA
      // CREATE LATITUDE & LONGITUDE VARIABLES TO INSERT INTO THE NEXT FETCH
      var lat = data['coord']['lat']
      var lon = data['coord']['lon']

      fetch( // CREATING A NEW FETCH FOR UV INDEX B/C NEED TO USE LATITUDE/LONGITUDE DATA FROM PREVIOUS FETCH
        'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=hourly,minutely&appid=4f4fc4b2d81e48700fb99a35e316ea42'
      )
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var uvDanger = data['current']['uvi']
        $('#uv').html(uvDanger)
        if (uvDanger < 3) {
          $('#uv').css('background-color', 'green')
        } else if (uvDanger > 3 && uvDanger < 6) {
          $('#uv').css('background-color', 'yellow')
        } else if (uvDanger > 6 && uvDanger < 8) {
          $('#uv').css('background-color', 'orange')
        } else if (uvDanger > 8 && uvDanger < 10) {
          $('#uv').css('background-color', 'red')
        } else {
          $('#uv').css('background-color', 'black')
          $('#uv').text('DANGER')
        }
      })
    })
  })
})