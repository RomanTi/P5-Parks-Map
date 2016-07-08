var map;
      // Create a new blank array for all the listing markers.
      var markers = [];
      var parks = [
          {title: 'Biscotasi Lake Provincial Park', location: {lat:47.348214 , lng:-82.021264 }, hiking:'n', biking:'n', skiing:'n', fishing:'n', size:35386, year: 1989},
          {title: 'Bon Echo Provincial Park', location: {lat:44.914947 , lng:-77.259566 }, hiking:'y', biking:'n', skiing:'n', fishing:'y', size:8295, year: 1971},
          {title: 'French River Provincial Park', location: {lat:45.899167 , lng:-80.839854 }, hiking:'y', biking:'n', skiing:'n', fishing:'y', size:51740, year: 1989},
          {title: 'Frontenac Provincial Park', location: {lat:44.504341 , lng:-76.555137 }, hiking:'y', biking:'n', skiing:'y', fishing:'y', size:5214, year: 1974},
          // {title: 'Fushimi Lake Provincial Park', location: {lat:49.828591 , lng:-83.917169 }, hiking:'y', biking:'n', skiing:'n', fishing:'y', size:5294, year: 1979},
          // {title: 'Grundy Lake Provincial Park', location: {lat:45.942848 , lng:-80.553441 }, hiking:'y', biking:'n', skiing:'n', fishing:'y', size:2554, year: 1959},
          // {title: 'Kawartha Highlands Provincial Park', location: {lat:44.745952 , lng:-78.220079 }, hiking:'n', biking:'n', skiing:'n', fishing:'y', size:37857, year: 1989},
          // {title: 'Killarney Provincial Park', location: {lat:46.083333 , lng:-81.333333 }, hiking:'y', biking:'n', skiing:'y', fishing:'y', size:48500, year: 1964},
          // {title: 'Lady Evelyn-Smoothwater Provincial Park', location: {lat:47.389198 , lng:-80.526051 }, hiking:'n', biking:'n', skiing:'n', fishing:'y', size:104248, year: 1973},
          // {title: 'Mississagi Provincial Park', location: {lat:46.601145 , lng:-82.682929 }, hiking:'y', biking:'y', skiing:'n', fishing:'y', size:99090, year: 1970},
          // {title: 'Murphys Point Provincial Park', location: {lat:44.781863 , lng:-76.237471 }, hiking:'y', biking:'n', skiing:'y', fishing:'y', size:1239, year: 1967},
          // {title: 'Quetico Provincial Park', location: {lat:48.469544 , lng:-91.455909 }, hiking:'y',  biking:'n',  skiing:'n', fishing:'y', size:475782, year: 1913},
          // {title: 'Sleeping Giant Provincial Park', location: {lat:48.432126 , lng:-88.762843 }, hiking:'y', biking:'n', skiing:'y', fishing:'y', size:24400, year: 1944},
          // {title: 'Spanish River Provincial Park', location: {lat:46.701028 , lng:-81.728861 }, hiking:'n', biking:'n', skiing:'n', fishing:'n', size:35386, year: 2001},
          // {title: 'The Massasauga Provincial Park', location: {lat:45.275835 , lng:-80.001297 }, hiking:'y', biking:'n', skiing:'n', fishing:'y', size:13105, year: 1989},
          // {title: 'Wabakimi Provincial Park', location: {lat:50.761549 , lng:-89.541024 }, hiking:'n', biking:'n', skiing:'n', fishing:'y', size:892061, year: 1983},
          // {title: 'Windy Lake Provincial Park', location: {lat:46.619148 , lng:-81.446128 }, hiking:'y', biking:'n', skiing:'y', fishing:'y', size:118, year: 1959},
          // {title: 'Woodland Caribou Provincial Park', location: {lat:51.079007 , lng:-94.850766 }, hiking:'n', biking:'n', skiing:'n', fishing:'y', size:450000, year: 1983}
        ];


      var weathers = [];
      for (var i = 0; i < parks.length; i++) {
        var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?lat='+parks[i].location.lat+'&lon='+parks[i].location.lng+'&APPID=453888232dff949ef3af61df93401269&units=metric'
        $.getJSON(weatherUrl, function(json) {
              var weather = {"description":"", "temperature":""};
              weather.description=json.weather[0].description;
              weather.temperature=json.main.temp;
              weathers.push(weather)
              console.log(weathers);
            });
          };
        /*        $.ajax({
        url: weatherUrl,
        dataType: "jsonp",

        success: function (response) {
          self.articleList.removeAll();
          var articles = response[1];

          for (var i=0; i<articles.length; i++){
            articleStr = articles[i];
            var url = 'http://en.wikipedia.org/wiki/' + articleStr;
            self.articleList.push(new article(articleStr, url));
          }

          clearTimeout(wikiRequestTimeout);
        }
      });
*/

      
 /*     weathers = [];
      for (var i = 0; i < parks.length; i++) {
          // Get the position from the location array.
          var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?lat='+parks.location.lat+'&lon='+parks.location.lng+'&APPID=453888232dff949ef3af61df93401269'
          $.getJSON(weatherUrl, function(data){
    
        $nytHeaderElem.text('New York Times Articles About ' + cityStr);
        
        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles [i];
            $nytElem.append('<li class="article">'+ '<a href="'+article.web_url+'">'+article.headline.main+'</a>'+'<p>'+article.snippet+'</p>'+'</li>');
            };
        }).error(function(e){
            $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
        });




          var location = parks[i].location;
          var title = parks[i].title;
          // Create a marker per location, and put into markers array.
          var marker = new google.maps.Marker({
            map: map,
            position: location,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i,
            icon: markerIcon

          });
          // Push the marker to our array of markers.
          markers.push(marker);
          // Create an onclick event to open an infowindow at each marker.
          marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
          });
          bounds.extend(markers[i].position);
        }

*/


      function initMap() {
        // Constructor creates a new map - only center and zoom are required.
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 51.2538, lng: -85.3232},
          zoom: 13
        });
        // These are the real estate listings that will be shown to the user.
        // Normally we'd have these in a database instead.

        var largeInfowindow = new google.maps.InfoWindow();
        var bounds = new google.maps.LatLngBounds();
        var markerIcon = "https://www.ontarioparks.com/images/icons/park_icon.png";
        // The following group uses the location array to create an array of markers on initialize.
        for (var i = 0; i < parks.length; i++) {
          // Get the position from the location array.
          var location = parks[i].location;
          var title = parks[i].title;
          // Create a marker per location, and put into markers array.
          var marker = new google.maps.Marker({
            map: map,
            position: location,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i,
            icon: markerIcon

          });
          // Push the marker to our array of markers.
          markers.push(marker);
          // Create an onclick event to open an infowindow at each marker.
          marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
          });
          bounds.extend(markers[i].position);
        }
        // Extend the boundaries of the map for each marker
        map.fitBounds(bounds);
      }
      // This function populates the infowindow when the marker is clicked. We'll only allow
      // one infowindow which will open at the marker that is clicked, and populate based
      // on that markers position.
      function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>' + '<div><strong>Year Established: </strong>' + parks[marker.id].year + '</div>' + 
            '<div><strong>Size: </strong>' + parks[marker.id].size + ' ha</div>' + '<div><strong>Weather: </strong>' + weathers[marker.id].description + ', ' + weathers[marker.id].temperature + 'C</div>');
          infowindow.open(map, marker);
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick',function(){
            infowindow.setMarker(null);
          });
        }
      }