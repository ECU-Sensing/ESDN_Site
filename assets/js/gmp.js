const mapsKey = "AIzaSyCdi64dltyurMzy_QJWr_kwBGOvZ1-ShK4"
// ESDN Primary Color
const esdn_color = "#9842f5";

// ECU General Information
const ecu_info = {
  name: "East Carolina University", 
  loc: { lat: 35.605124, lng:  -77.365271 },
}

// Implementation Status (0-3)
// 0. Planned
// 1. Planned (Switch to In-progress when color is identified)
// 2. Active
// 3. Archived
const states = [
  {
    text: "Planned",
    icon: "assets/icons/icon_tower_alt_planned.png",
    color: "#FED01A",
  },
  {
    text: "Planned",
    icon: "assets/icons/icon_tower_alt_staged.png",
    color: "#0096FD"
  },
  {
    text: "Active",
    icon: "assets/icons/icon_tower_alt_active.png",
    color: esdn_color,
  },
  {
    text: "Archived",
    icon: "assets/icons/icon_tower_alt_archived.png",
    color: "FD0000",
  }
]

// ESDN Map Location Dictionary
const esdn_map = {
    scitech: { 
      name: "East Carolina University - Science and Technology Bldg",
      loc:  { lat: 35.605124, lng:  -77.365271 },
      coverage_area: 7500,
      status: 2,
    },
    brody: {
      name: "East Carolina University - Brody School of Medicine",
      loc: { lat: 35.609626, lng:  -77.402157 },
      coverage_area: 7500,
      status: 1,
    },
    seagull: {
      name: "YMCA - Camp Seagull & Camp Seafarer",
      loc:  { lat: 34.994108, lng: -76.854844 },
      coverage_area: 15000,
      status: 2,
    },
    mattamuskeet: {
      name: "Lake Mattamuskeet",
      loc:  { lat: 35.451608, lng: -76.176196 },
      coverage_area: 15000,
      status: 1,
    },
    csi: {
      name: "East Carolina University - Costal Studies Institute",
      loc:  { lat: 35.873228, lng: -75.661204 },
      coverage_area: 15000,
      status: 1,
    },
    wrc: {
      name: "East Carolina University - West Research Campus",
      loc:  { lat: 35.632030, lng: -77.493024 },
      coverage_area: 15000,
      status: 1,
    },
    cope1: {
      name: "COPE Project Footprint - Greenville",
      loc:  { lat: 35.609643, lng: -77.305522 },
      coverage_area: 15000,
      status: 1,
    },
    cope2: {
      name: "COPE Project Footprint - Grimesland",
      loc:  { lat: 35.563930, lng: -77.180505 },
      coverage_area: 15000,
      status: 1,
    },
    cope3: {
      name: "COPE Project Footprint - Goose Creek State Park",
      loc:  { lat: 35.473107, lng: -76.907259 },
      coverage_area: 15000,
      status: 1,
    },
    cope4: {
      name: "COPE Project Footprint - Little Washington",
      loc:  { lat: 35.547725, lng: -77.046222 },
      coverage_area: 15000,
      status: 1,
    },
    cope5: {
      name: "COPE Project Footprint - Bath",
      loc:  { lat: 35.428098, lng: -76.740445 },
      coverage_area: 15000,
      status: 1,
    },
    cope6: {
      name: "COPE Project Footprint - Swan Quarter",
      loc:  { lat: 35.405544, lng: -76.329505},
      coverage_area: 15000,
      status: 1,
    },

};



// Initialize and add the map
function initMap() {

  // Map Definition
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 9,
    center: {lat: 35.495815, lng:-76.449726 },
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
        icon: states[esdn_map[point].status].icon,
        map: map,
    });

    // Define Mouseover Event
    marker.addListener("mouseover", () =>{
      const content =  '<strong><u>' + esdn_map[point].name + '</strong></u>' + '<br>Status: '+ states[esdn_map[point].status].text + '<br>Latitude: ' + esdn_map[point].loc.lat + '<br>Longitude: ' + esdn_map[point].loc.lng ;
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
        strokeColor: states[esdn_map[point].status].color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: states[esdn_map[point].status].color,
        fillOpacity: 0.15,
        map,
        center: esdn_map[point].loc,
        radius: esdn_map[point].coverage_area
    });

    coverage_circle.addListener("mouseover", () =>{
      const content =  '<strong><u>' + esdn_map[point].name + '</strong></u>' + '<br>Status: '+ states[esdn_map[point].status].text + '<br>Latitude: ' + esdn_map[point].loc.lat + '<br>Longitude: ' + esdn_map[point].loc.lng ;
      infoWindow.setContent(content);
      infoWindow.open(map, marker);
      window.setTimeout(function() {infoWindow.close(map, marker);},5000);
    });

    // Add Marker to Markers array
    markers.push(marker);
  };
  
  // Batch Marker manager
  new MarkerClusterer({markers,map})
}

// Display Map
window.initMap = initMap;