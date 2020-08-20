$(document).ready(function() {

    // Search parameters
    var cityInput;
    var date;
    var allCities = [];

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
        allCities.push(cityInput); //adds to array

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid="+ apiKey + "&units=imperial";
        // First AJAX call to get lat/lon coordinates based on city input
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            // console.log(response);
            
            localStorage.setItem("city", allCities);
            cityName = response.name;
            country = response.sys.country;
            date = response.dt; //Time of data calculation, unix, UTC
            // convert dt to actual date:

            lon = response.coord.lon;
            lat = response.coord.lat;

            
            // Second/Main AJAX Call to get weather data
            var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&appid=e68a6c498567148d8870611b117efac1&units=imperial";
            //https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=daily&appid=e68a6c498567148d8870611b117efac1&units=imperial

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
    
                // Get current weather data
                temp = response.current.temp; 
                humidity = response.current.humidity;
                windspeed = response.current.wind_speed;
                uvIndex = response.current.uvi;
                currentIcon = response.current.weather[0].icon;
                
                // Get data for 5-day forecast
                for (var i=0; i < 5; i++) {
                    dailyTemp = response.daily[i].temp.day;
                    dailyHumidity = response.daily[i].humidity;

                    // console.log(dailyTemp);
                    // console.log(dailyHumidity);

                    // Switch statement
                    switch (i) {
                        case 0:
                            $("#0").append( $("<div>").text("Temp: " + dailyTemp + "F") );
                            $("#0").append( $("<div>").text("Humidity: " + dailyHumidity + "%") );
                            break;

                        case 1:
                            $("#1").append( $("<div>").text("Temp: " + dailyTemp + "F") );
                            $("#1").append( $("<div>").text("Humidity: " + dailyHumidity + "%") );
                            break;

                        case 2:
                            $("#2").append( $("<div>").text("Temp: " + dailyTemp + "F") );
                            $("#2").append( $("<div>").text("Humidity: " + dailyHumidity + "%") );
                            break;

                        case 3:
                            $("#3").append( $("<div>").text("Temp: " + dailyTemp + "F") );
                            $("#3").append( $("<div>").text("Humidity: " + dailyHumidity + "%") );
                            break;                           
                            
                        case 4:
                            $("#4").append( $("<div>").text("Temp: " + dailyTemp + "F") );
                            $("#4").append( $("<div>").text("Humidity: " + dailyHumidity + "%") );
                            break; 
                    }
                    
                    // If id is = to i
                    // if ( parseInt($(".forecast").attr("id")) === i ) {
                    //     console.log("Day: " + i);
                    //     console.log($(this) );
                    //     // Add data to corresponding day 
                    //     $("#0").append( $("<div>").text("Temp: " + dailyTemp + "F") );
                    //     $("#0").append( $("<div>").text("Humidity: " + dailyHumidity + "%") );
                    // }
  
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
        var history = JSON.parse(localStorage.getItem("city") ); 
        // history.concat(localStorage.getItem("city")) ;
        console.log(history); 

        // for (var i=0; i < history.length; i++) {
        //     console.log(history[i]);
        //     var historyBtn = $("<button>").addClass("historyBtn");
        //     historyBtn.text(history[i]);
        //     $(".history").append(historyBtn);

        // }
        // history.attr("border: 1px solid"); // add to css class

        $(history).each( (index, element) => {
            console.log(index);
            var historyBtn = $("<button>").addClass("historyBtn");
            historyBtn.text(element);
            $(".history").append(historyBtn);
        });


        
    

    }


    function future(){
        // Date, Icon, Temp, Humidity

        // Date goes here
        // // weather icon here
        // $("<div>").text("Temperature: " + temp + " F");
        // $("<div>").text("Humidity: " + humidity + " %");



    }
    









});