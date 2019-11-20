function initMap() {
  let latlng = new google.maps.LatLng(6.459964, 7.548949);
  let map = new google.maps.Map(document.getElementById("map"), {
    center: latlng,
    zoom: 8
  });
}