$(document).ready(function() {

    // Search parameters
    var cityInput;
    var date;

    // Weather data
    var cityName;
    var country;
    var tempF;
    var humidity;
    var windspeed;
    var uvIndex;

    

    // Retrieve the city input by the user
    $(".citySubmit").on("click", function(event){
        event.preventDefault();
        cityInput = $(".cityInput").val().trim();


        // var apiKey = "e68a6c498567148d8870611b117efac1";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=e68a6c498567148d8870611b117efac1";

        // AJAX call to get the weather data
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            
            cityName = response.name;
            country = response.sys.country;
            // date = response;
            var tempKelvin = response.main.temp; // in Kelvin
            tempF = parseFloat(((tempKelvin-273.15)*1.8)+32).toFixed(2);
            humidity = response.main.humidity;
            windspeed = response.wind.speed;
            // uvIndex = response;

            current();
            future();
        }); 
        
    });

    function current() {
        // Add city Name to top section (".currentWeather")

        // Add to history and pull info from localStorage
        localStorage.setItem("city", cityName);
        var history = $("<div>").text( localStorage.getItem(localStorage.key(0)) );
        history.attr("border: 1px solid");
        $(".history").append(history);
        console.log(localStorage.getItem(localStorage.key(0) ));


        // Pull this data from API (or localStorage?)

        $("#cityName").html(cityName + ", " + country);
        $("#date").text(date);
        $("#temp").text("Temperature: " + tempF + " F");
        $("#humidity").text("Humidity: " + humidity);
        $("#windSpeed").text("Wind Speed: " + windspeed);
        $("#uvIndex").text("UV Index: " + uvIndex);
        
    }


    function future(){


    }
    









});