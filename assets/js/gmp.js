const mapsKey = "AIzaSyCdi64dltyurMzy_QJWr_kwBGOvZ1-ShK4"

// ECU General Information
const ecu_info = {
  name: "East Carolina University", 
  loc: { lat: 35.605124, lng:  -77.365271 },
}

// ESDN Map Location Dictionary
const esdn_map = {
    scitech: { 
      name: "East Carolina University - Science and Technology Bldg",
      loc:  { lat: 35.605124, lng:  -77.365271 },
      coverage_area: 5000,
      icon: "assets/icons/icon_tower.png",
      status: 'Online',
    },
    brody: {
      name: "East Carolina University - Brody School of Medicine",
      loc: { lat: 35.609626, lng:  -77.402157 },
      coverage_area: 7500,
      icon: "assets/icons/icon_tower.png",
      status: 'Offline',
    },
    seagull: {
      name: "YMCA - Camp Seagull & Camp Seafarer",
      loc:  { lat: 34.994108, lng: -76.854844 },
      coverage_area: 10000,
      icon: "assets/icons/icon_tower.png",
      status: 'Online',
    }
};

// ESDN Primary Color
const esdn_color = "#9842f5";

// Initialize and add the map
function initMap() {

  // Map Definition
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: ecu_info.loc,
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true,
  });

  // Default InfoWindow for each Marker
  const infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });

  // Marker Array for Batch control
  var markers = [];

  // Marker creation for entire dictionary
  for (let point in esdn_map) {
    
    // Define Marker 
    const marker = new google.maps.Marker({
        position: esdn_map[point].loc,
        icon: esdn_map[point].icon,
        map: map,
    });

    // Define Mouseover Event
    marker.addListener("mouseover", () =>{
      const content =  '<strong><u>' + esdn_map[point].name + '</strong></u>' + '<br>Status: '+ esdn_map[point].status + '<br>Latitude: ' + esdn_map[point].loc.lat + '<br>Longitude: ' + esdn_map[point].loc.lng ;
      infoWindow.setContent(content);
      infoWindow.open(map, marker);
      window.setTimeout(function() {infoWindow.close(map, marker);},5000);
    });

    // Define Click Event
    marker.addListener('click',function() {
      var pos = map.getZoom();
      map.setZoom(12);
      map.setCenter(marker.getPosition());
      window.setTimeout(function() {map.setZoom(pos);},5000);
    });

    // Define Coverage Circle
    const coverage_circle = new google.maps.Circle({
        strokeColor: esdn_color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: esdn_color,
        fillOpacity: 0.15,
        map,
        center: esdn_map[point].loc,
        radius: esdn_map[point].coverage_area
    });
    // Add Marker to Markers array
    markers.push(marker);
  };
  
  // Batch Marker manager
  new MarkerClusterer({markers,map})
}

// Display Map
window.initMap = initMap;