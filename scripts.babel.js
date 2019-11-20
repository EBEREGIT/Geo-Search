// initiate the map here
function initMap() {
  // create an instance of Map class
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: {lat:  6.459964, lng: 7.548949}
  });

  // create an instance of Geocoder class 
  var geocoder = new google.maps.Geocoder();

  // call the geocodeAddress function 
  document.getElementById('submit').addEventListener('click', function(e) {
    e.preventDefault();
    geocodeAddress(geocoder, map);
  });
}

// geocoding here
function geocodeAddress(geocoder, resultsMap) {
  // get the vlaue of the address input
  var address = document.getElementById('address').value;

  // convert the address to cordinates here
  geocoder.geocode({'address': address}, function(results, status) {
    // check the status. If OK, get the cordinates
    if (status === 'OK') {
      // get the cordinates here
      resultsMap.setCenter(results[0].geometry.location);
      // place the marker on the location here
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}