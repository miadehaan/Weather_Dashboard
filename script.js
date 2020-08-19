$(document).ready(function() {

    // Search parameters
    var cityInput;
    var date;

    // Weather data
    var cityName;
    var country;
    var temp;
    var humidity;
    var windspeed;
    var uvIndex;
    var lon;
    var lat;
    var currentIcon;
    var tempForecast;
    var humidityForecast;
    var dailyTemp;
    var dailyHumidity;
    

    var apiKey = "e68a6c498567148d8870611b117efac1";

    // Retrieve the city input by the user
    $(".citySubmit").on("click", function(event){
        event.preventDefault();

        // Get the city the user input
        cityInput = $(".cityInput").val().trim();

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid="+ apiKey + "&units=imperial";
        // First AJAX call to get lat/lon coordinates based on city input
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            // console.log(response);
            
            localStorage.setItem("city", response.name);
            cityName = localStorage.getItem("city");
            country = response.sys.country;
            date = response.dt; //Time of data calculation, unix, UTC
            lon = response.coord.lon;
            lat = response.coord.lat;

            
            // Second/Main AJAX Call to get weather data
            var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&appid=e68a6c498567148d8870611b117efac1";
            //https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=daily&appid=e68a6c498567148d8870611b117efac1&units=imperial

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
    
                // Get current weather data
                temp = response.current.temp; 
                humidity = response.current.humidity;
                windspeed = response.current.speed;
                uvIndex = response.current.uvi;
                currentIcon = response.current.weather[0].icon;
                
                // Get data for 5-day forecast
                for (var i=0; i < response.daily.length; i++) {
                    dailyTemp = response.daily[i].temp.day;
                    dailyHumidity = response.daily[i].humidity;


  
                }

                
                current();
                future(); 
            });
        }); 
    });


    function current() {

        // Pull this data from localStorage ???

        $("#cityName").text(cityName + ", " + country);
        $(".date").text("(" + date + ")");
        $("#temp").text("Temperature: " + temp + " F");
        $("#humidity").text("Humidity: " + humidity + " %");
        $("#windSpeed").text("Wind Speed: " + windspeed + " mph");
        $("#uvIndex").text("UV Index: " + uvIndex);

        // Add weather Icon
        var iconURL = "http://openweathermap.org/img/wn/" + currentIcon + "@2x.png";
        $(".weatherIcon").attr("src", iconURL);

        
        
        // Display the search history and pull info from localStorage
        var history = $("<div>").text( localStorage.getItem("city") );
        history.attr("border: 1px solid");
        $(".history").append(history);
        
        // console.log(localStorage.getItem(localStorage.key(0) ));
        

    }


    function future(){
        // Date, Icon, Temp, Humidity

        // Date goes here
        // // weather icon here
        // $("<div>").text("Temperature: " + temp + " F");
        // $("<div>").text("Humidity: " + humidity + " %");

        $("#0").append( $("<div>").text("Temp: " + temp + "F") );
        $("#0").append( $("<div>").text("Humidity: " + humidity + "%") );

    }
    









});