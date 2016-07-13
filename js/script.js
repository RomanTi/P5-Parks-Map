// array of parks
var initParks = [{
  id: 0,
  title: "Biscotasi Lake",
  location: {
    lat: 47.348214,
    lng: -82.021264
  },
  size: 35386,
  year: 1989
}, {
  id: 1,
  title: "Bon Echo",
  location: {
    lat: 44.914947,
    lng: -77.259566
  },
  size: 8295,
  year: 1971
}, {
  id: 2,
  title: "French River",
  location: {
    lat: 45.899167,
    lng: -80.839854
  },
  size: 51740,
  year: 1989
}, {
  id: 3,
  title: "Frontenac",
  location: {
    lat: 44.504341,
    lng: -76.555137
  },
  size: 5214,
  year: 1974
}, {
  id: 4,
  title: "Fushimi Lake",
  location: {
    lat: 49.828591,
    lng: -83.917169
  },
  size: 5294,
  year: 1979
}, {
  id: 5,
  title: "Grundy Lake",
  location: {
    lat: 45.942848,
    lng: -80.553441
  },
  size: 2554,
  year: 1959
}, {
  id: 6,
  title: "Kawartha Highlands",
  location: {
    lat: 44.745952,
    lng: -78.220079
  },
  size: 37857,
  year: 1989
}, {
  id: 7,
  title: "Killarney",
  location: {
    lat: 46.083333,
    lng: -81.333333
  },
  size: 48500,
  year: 1964
}, {
  id: 8,
  title: "Lady Evelyn-Smoothwater",
  location: {
    lat: 47.389198,
    lng: -80.526051
  },
  size: 104248,
  year: 1973
}, {
  id: 9,
  title: "Mississagi",
  location: {
    lat: 46.601145,
    lng: -82.682929
  },
  size: 99090,
  year: 1970
}, {
  id: 10,
  title: "Murphys Point",
  location: {
    lat: 44.781863,
    lng: -76.237471
  },
  size: 1239,
  year: 1967
}, {
  id: 11,
  title: "Quetico",
  location: {
    lat: 48.469544,
    lng: -91.455909
  },
  size: 475782,
  year: 1913
}, {
  id: 12,
  title: "Sleeping Giant",
  location: {
    lat: 48.432126,
    lng: -88.762843
  },
  size: 24400,
  year: 1944
}, {
  id: 13,
  title: "Spanish River",
  location: {
    lat: 46.701028,
    lng: -81.728861
  },
  size: 35386,
  year: 2001
}, {
  id: 14,
  title: "The Massasauga",
  location: {
    lat: 45.275835,
    lng: -80.001297
  },
  size: 13105,
  year: 1989
}, {
  id: 15,
  title: "Wabakimi",
  location: {
    lat: 50.761549,
    lng: -89.541024
  },
  size: 892061,
  year: 1983
}, {
  id: 16,
  title: "Windy Lake",
  location: {
    lat: 46.619148,
    lng: -81.446128
  },
  size: 118,
  year: 1959
}, {
  id: 17,
  title: "Woodland Caribou",
  location: {
    lat: 51.079007,
    lng: -94.850766
  },
  size: 450000,
  year: 1983
}];


function AppViewModel() {
  var self = this;
  var currentMarker = null;
  var map;
  var largeInfowindow = new google.maps.InfoWindow();
  var markers = [];
  var markerIcon = "https://www.ontarioparks.com/images/icons/park_icon.png";

  //Function to initialize the map
  function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: {
        lat: 51.2538,
        lng: -85.3232
      },
      zoom: 13
    });
  }

  initMap();

  //Park object is used to create the marker and populate the infowindow

  var Park = function(park, map) {
    this.title = park.title;
    this.location = park.location;
    this.id = park.id;

    var previousInfoWindow;
    var marker = new google.maps.Marker({
      position: park.location,
      title: park.title,
      animation: google.maps.Animation.DROP,
      map: map,
      id: park.id,
      icon: markerIcon
    });

    function populateInfoWindow(marker, infowindow) {
      // Check to make sure the infowindow is not already opened on this marker.
      if (infowindow.marker != marker) {
        // Current marker is stored to reset the animation
        if (currentMarker != null) {
          currentMarker.setAnimation(null);
        }
        currentMarker = marker;
        marker.setAnimation(google.maps.Animation.BOUNCE);
        infowindow.marker = marker;
        map.panTo(marker.position);

        // openweathermap.org API was used
        var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + initParks[marker.id].location.lat + "&lon=" + initParks[marker.id].location.lng + "&APPID=453888232dff949ef3af61df93401269&units=metric";
        var weather = {
          "description": "",
          "temperature": ""
        };

        // Function to infowindow the window
        function infowindowsetContent(apidata) {

          infowindow.setContent("<div><strong>" + marker.title + "</strong></div><hr>" + "<div><strong>Year Established: </strong>" + initParks[marker.id].year + "</div>" +
            "<div><strong>Size: </strong>" + initParks[marker.id].size + " ha</div>" + "<div><strong>Current Weather: </strong>" + apidata);
          infowindow.open(map, marker);
          infowindow.addListener("closeclick", function() {
            infowindow.marker = null;
            marker.setAnimation(null);
          });
        }
        // Populating the infowindow and receiving the weather data with error handling
        $.ajax({
          url: weatherUrl,
          dataType: "json",
          success: function(data) {
            weather.description = data.weather[0].description;
            weather.temperature = data.main.temp;
            var apidata = String(weather.description + ", " + weather.temperature + "C</div>");
            infowindowsetContent(apidata);
          },
          error: function(data) {
            var apidata = "Couldn't load the data </div>";
            infowindowsetContent(apidata);
          }
        });
      }
    }

    marker.addListener("click", function() {
      populateInfoWindow(this, largeInfowindow);
    });

    markers.push(marker);

  };

  self.parksList = ko.observableArray([]);
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < initParks.length; i++) {
    self.parksList.push(new Park(initParks[i], map));
    var latlng = new google.maps.LatLng(initParks[i].location);

    bounds.extend(latlng);

  }
  map.fitBounds(bounds);

  // Is used to link the list element to the marker click
  self.markerClick = function(park) {
    google.maps.event.trigger(markers[park.id], "click");
  }

  // Search implementation
  self.query = ko.observable("");
  self.filteredParks = ko.computed(function() {
    // Sets all the markers to invisible
    for (var i = 0; i < initParks.length; i++) {
      markers[i].setVisible(false);
    };
    var search = self.query().toLowerCase();

    var filteredArray = ko.utils.arrayFilter(self.parksList(), function(park) {
      return park.title.toLowerCase().indexOf(search) >= 0;
    });
    // Sets only markers from filteredArray visible
    for (var i = 0; i < filteredArray.length; i++) {
      markers[filteredArray[i].id].setVisible(true);
    }
    return filteredArray;
  });
}

ko.applyBindings(new AppViewModel());


/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "280px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}