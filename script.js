// Search parameters
var city;
var date;

// Local Storage
let history = JSON.parse(window.localStorage.getItem("history")) || [];

    
// Weather data
var cityName;
var country;
var temp;
var humidity;
var windspeed;
var uvIndex;
var currentIcon;
var lat;
var lon;
    

$(document).ready(function() {
    // Show latest city from local storage when page is refreshed
    current(history[history.length-1] );

    // Retrieve the city input by the user
    $(".citySubmit").on("click", function(event){
        event.preventDefault();

        // Get the city the user input
        city = $(".cityInput").val().trim();
        current(city);
        $(".cityInput").val('');
    });
    
    // Make new button for history
    for (var i=0; i < history.length; i++) {
        newButton(history[i]);
    }


    // event listener for history buttons
    $(".historyBtn").on("click", function(event){
        current( $(this).val() );
    });

});

function newButton(city) {
        var historyBtn = $("<button>").addClass("historyBtn");
        historyBtn.val(city);
        historyBtn.text(city);
        $(".historyList").append(historyBtn);
}


function current(city) {
    var apiKey = "e68a6c498567148d8870611b117efac1";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid="+ apiKey + "&units=imperial";
    // First AJAX call to get lat/lon coordinates based on city input
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // console.log(response);

        // need to set window with a stringify to get back a JSON object
        while (history.indexOf(city) === -1) {
            history.push(city);
            window.localStorage.setItem("history", JSON.stringify(history));
            newButton(city);
        }

        cityName = response.name;
        country = response.sys.country;
        date = unixTimestamp(response.dt); // convert dt to actual date

        // Get current weather data
        temp = response.main.temp; 
        humidity = response.main.humidity;
        windspeed = response.wind.speed;
        currentIcon = response.weather[0].icon;

        lon = response.coord.lon;
        lat = response.coord.lat;

        // Create elements with the weather data
        $("#cityName").text(cityName + ", " + country);
        $(".date").text("(" + date + ")");
        $("#temp").text("Temperature: " + temp + " F");
        $("#humidity").text("Humidity: " + humidity + " %");
        $("#windSpeed").text("Wind Speed: " + windspeed + " mph");

    
        // Add weather Icon
        var iconURL = "http://openweathermap.org/img/wn/" + currentIcon + "@2x.png";
        $(".weatherIcon").attr("src", iconURL);
    
        future(city);
                
        
    });
}

function unixTimestamp(t) {
    var date = new Date(t*1000);
    var months_arr = ['1','2','3','4','5','6','7','8','9','10','11','12'];
    var month = months_arr[date.getMonth()];
    var year = date.getFullYear();
    var day = date.getDate();
    var dateDisplay = month + '/' + day + '/' + year;

    return dateDisplay;
}

function future(city) {
    // Date, Icon, Temp, Humidity
    // Second/Main AJAX Call to get weather data
    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&appid=e68a6c498567148d8870611b117efac1&units=imperial";
    //https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=daily&appid=e68a6c498567148d8870611b117efac1&units=imperial

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // console.log(response);

        // get UV index
        let uvIndex = response.current.uvi;
        console.log(uvIndex);
        $("#uvIndex").text("UV Index: " + uvIndex);
        
        if(uvIndex < 3) {
            $("#uvIndex").addClass("uvGreen");
        } else if(uvIndex >= 3 && uvIndex < 7){
            $("#uvIndex").addClass("uvYellow");
        } else {
            $("#uvIndex").addClass("uvRed");
        }
                
        $(".forecast").empty();
        // Get data for 5-day forecast
        for (var i=1; i < 6; i++) {
            let day = response.daily[i].dt; // ( date of forecast )
            let dailyTemp = response.daily[i].temp.day;
            let dailyHumidity = response.daily[i].humidity;
            let icon = response.daily[i].weather[0].icon;
            let iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            // Switch statement
            switch (i) {
                case 1:
                    $("#1").append( $("<div>").addClass("forecastDate").text(unixTimestamp(day)) );
                    $("#1").append( $("<img>").attr("src", iconURL) );
                    $("#1").append( $("<div>").text("Temp: " + dailyTemp + "F") );
                    $("#1").append( $("<div>").text("Humidity: " + dailyHumidity + "%") );
                    break;

                case 2:
                    $("#2").append( $("<div>").addClass("forecastDate").text(unixTimestamp(day)) );
                    $("#2").append( $("<img>").attr("src", iconURL) );
                    $("#2").append( $("<div>").text("Temp: " + dailyTemp + "F") );
                    $("#2").append( $("<div>").text("Humidity: " + dailyHumidity + "%") );
                    break;

                case 3:
                    $("#3").append( $("<div>").addClass("forecastDate").text(unixTimestamp(day)) );
                    $("#3").append( $("<img>").attr("src", iconURL) );
                    $("#3").append( $("<div>").text("Temp: " + dailyTemp + "F") );
                    $("#3").append( $("<div>").text("Humidity: " + dailyHumidity + "%") );
                    break;

                case 4:
                    $("#4").append( $("<div>").addClass("forecastDate").text(unixTimestamp(day)) );
                    $("#4").append( $("<img>").attr("src", iconURL) );
                    $("#4").append( $("<div>").text("Temp: " + dailyTemp + "F") );
                    $("#4").append( $("<div>").text("Humidity: " + dailyHumidity + "%") );
                    break;                           
                    
                case 5:
                    $("#5").append( $("<div>").addClass("forecastDate").text(unixTimestamp(day)) );
                    $("#5").append( $("<img>").attr("src", iconURL) );
                    $("#5").append( $("<div>").text("Temp: " + dailyTemp + "F") );
                    $("#5").append( $("<div>").text("Humidity: " + dailyHumidity + "%") );
                    break; 
            }
        }    
    });
}
