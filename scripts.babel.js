// call the geocodeAddress function
function initMap() {
  // get elements
  const btn = document.querySelector("#search-form");
  const address = document.querySelector("#address");

  let geocoder = new google.maps.Geocoder();

  // convert the address to cordinates here
  geocoder.geocode({ address: address.value }, function(results, status) {
    // check the status. If OK, get the cordinates
    if (status === "OK") {
      // get the cordinates here
      console.log(resultsMap.setCenter(results[0].geometry.location));
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}
