// initiate the map here
function initMap() {
  // set initial cordinates
  var cordinates = { lat: 6.459964, lng: 7.548949 };
  // create an instance of Map class
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: cordinates
  });
  // create an instance of Geocoder class
  var geocoder = new google.maps.Geocoder();
  // call the geocodeAddress function
  document.getElementById("submit").addEventListener("click", function(e) {
    e.preventDefault();
    geocodeAddress(geocoder, map);
  });
  // add a customized marker
  mapMarker(map, cordinates);
  weatherCondition("Enugu");
}

// geocoding here
function geocodeAddress(geocoder, resultsMap) {
  // get the vlaue of the address input
  var address = document.getElementById("address").value;

  // convert the address to cordinates here
  geocoder.geocode({ address: address }, function(results, status) {
    // check the status. If OK, get the cordinates
    if (status === "OK") {
      // get the cordinates here
      let newCordinates = results[0].geometry.location;
      console.log(newCordinates[0]);

      // place cordinates as the center of the map
      resultsMap.setCenter(newCordinates);
      // place the marker on the location here
      mapMarker(resultsMap, newCordinates);
      // retrieve weather condition
      weatherCondition(address);
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

// add a custom marker on the map
function mapMarker(map, position) {
  var marker = new google.maps.Marker({ position: position, map: map });
}

// get weather condition
function weatherCondition(location) {
  const windSpeed = document.querySelector("#wind-speed");
  const humidity = document.querySelector("#humidity");
  const weatherSection = document.querySelector("#weather-condition");
  const errorSection = document.querySelector("#error");

  // prepare request
  let apiRequest = new XMLHttpRequest();
  // set the URL
  let url =
    "https://openweathermap.org/data/2.5/weather?q=" +
    location +
    "&appid=b6907d289e10d714a6e88b30761fae22";
  // open the request
  apiRequest.open("GET", url);
  // send the request
  apiRequest.send();

  // retrieve api data here
  apiRequest.onreadystatechange = () => {
    // check if the readyState is s
    if (apiRequest.readyState === 4) {
      // check if the status is unsuccessful
      if (apiRequest.status == 404) {
        // display error message
        return (errorSection.textContent =
          "Invalid Location, Please check your spellings...");
      }

      // ensure that there is no error message
      errorSection.textContent = "";
      // retrieve and convert API response from string to JSON
      const response = JSON.parse(apiRequest.response);

      // display weather here
      windSpeed.textContent = response.wind.speed + "m/s";
      humidity.textContent = response.main.humidity + "%";
      weatherSection.textContent =
        response.weather[0].main + " (" + response.weather[0].description + ")";

      // convert temperature
      temperatureDisplay(response);
    }
  };
}

// handle temperature conversion
function temperatureDisplay(response) {
  const celcius = document.querySelector("#celcius");
  const fahrenheit = document.querySelector("#fahrenheit");
  
  // display temperature here
  celcius.value = response.main.temp;
  fahrenheit.value = celciusToFahrenheit(celcius.value);

  // convert temp when a user changes the value
  celcius.addEventListener('keyup', function(e) {
    let cel = e.target.value;    
    let fah = (cel * (9/5)) + 32;
    fahrenheit.value = fah;
  });

  // convert temp when a user changes the value
  fahrenheit.addEventListener('keyup', function(e) {
    let fah = e.target.value;    
    let cel = (fah - (32)) + (5/9);
    celcius.value = cel;
  });
}

// convert from celcius To fahrenheit
function celciusToFahrenheit(celciusTemperation) {
  let fahrenheit = (celciusTemperation * (9/5)) + 32;
  return fahrenheit;  
}

// convert from fahrenheit To celcius
function fahrenheitToCelcius(fahrenheitTemperation) {
  let celcius = (fahrenheitTemperation - (32)) + (5/9);
  return celcius;
}