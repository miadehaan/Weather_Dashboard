$(document).ready(function() {

    // Search parameters
    var cityInput;
    var date;

    // Weather data
    var cityName;
    var temp;
    var humidity;
    var windspeed;
    var uvIndex;

    

    // Retrieve the city input by the user
    $(".citySubmit").on("click", function(event){
        event.preventDefault();
        cityInput = $(".cityInput").val().trim();
        console.log(cityInput);


        // var apiKey = "e68a6c498567148d8870611b117efac1";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=e68a6c498567148d8870611b117efac1";

        // AJAX call to get the weather data
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            
            cityName = response.name;
            // date = response;
            temp = response.main.temp; // in Kelvin
            humidity = response.main.humidity;
            windspeed = response.wind.speed;
            // uvIndex = response;
        }); 


        // Add to history and pull info from localStorage
        localStorage.setItem("city", cityInput);
        var history = $("<div>").text( localStorage.getItem(localStorage.key(0)) );
        history.attr("border: 1px solid");
        $(".history").append(history);
        console.log(localStorage.getItem(localStorage.key(0) ));

        current();
        future();

        
    });

    function current() {
        // Add city Name to top section (".currentWeather")
        // Pull this data from API (or localStorage?)

        // $(".cityName").html(cityName + ", " + response.sys.country);
        // $(".date").text(date);
        // $(".temp").text(temp);
        // $(".humidity").text(humidity);
        // $(".windSpeed").text(windspeed);
        // $(".uvIndex").text(uvIndex);
        
    }


    function future(){


    }
    









});