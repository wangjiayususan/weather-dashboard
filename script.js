var cities=[];
var cityDivEl=document.querySelector("#city-search-div");
var cityInputEl=document.querySelector("#city");
var citySearchInputEl=document.querySelector("#searched-city");
var searchHistoryButtonEl=document.querySelector("#searchHistory");
var currentInfoEl=document.querySelector("#current-weather-info");
var forecastTitle=document.querySelector("#forecast");
var forecastInfoEl=document.querySelector("#five-day-weather-info");

var getCurrentWeather=function(city){
    var apiKey="50800056cb7625c31cfc2a3e0e53dafc";
    var apiURL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            shownCurrentWeather(data,city);
        });
    });
};

var getUvIndex=function(lat,lon){
    var apiKey="50800056cb7625c31cfc2a3e0e53dafc";
    var apiURL=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${apiKey}`;
    
    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
            shownUvIndex(data)
        });
    });

   var lat=weather.coord.lat;
   var lon=weather.coord.lon;
   getUvIndex(lat,lon)
};

var getForecastWeather=function(city){
    var apiKey="50800056cb7625c31cfc2a3e0e53dafc"
    var apiURL=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
           shownForecastWeather(data);
        });
    });
};

var shownCurrentWeather=(weather, searchCity) => {
    //title
    currentInfoEl.textContent="";
    searchCity=citySearchInputEl.textContent;
    //date
    var currentDate = document.createElement("span");
    currentDate.textContent = moment(weather.date.value).format("MM/DD/YYYY");
    citySearchInputEl.appendChild(currentDate);
    //weather icon
    var Icon = document.createElement("img");
    Icon.setAttribute("src", `https://openweathermap.org/img/w/${cityWeatherResponse.weather[0].description}.png`);
    citySearchInputEl.appendChild(Icon);
    //temperature
    var temperatureEl = document.createElement("span");
    temperatureEl.textContent = "Temperature:" + weather.main.temp + " °F";
    temperatureEl.classList = "list-group-item";
    currentInfoEl.appendChild(temperatureEl);
    //humidity
    var humidityEl = document.createElement("span");
    humidityEl.textContent = "Humidity:" + weather.main.humidity + " %";
    humidityEl.classList = "list-group-item";
    currentInfoEl.appendChild(humidityEl);
    //wind
    var windSpeedEl = document.createElement("span");
    windSpeedEl.textContent = "Wind Speed:" + weather.wind.speed + " MPH";
    windSpeedEl.classList = "list-group-item";
    currentInfoEl.appendChild(windSpeedEl);
}
 
var shownUvIndex=function(index){
    var uvIndexEl=document.createElement("span");
    uvIndexValue=document.createElement("span");
    uvIndexEl.textContent="UV Index:"
    uvIndexValue.textContent=index.value;
    uvIndexEl.classList="list-group-item"
    uvIndexEl.appendChild(uvIndexValue);
    currentInfoEl.appendChild(uvIndexEl);

    // 0-2 green#7FFF00, 3-5 yellow#FFD700, 6-7 orange#FFA500, 8-10 orangered#FF4500, 11+ red#FF0000
    if (index.value>=0 && index.value<=2) {
        span.style="background-color: #7FFF00"
    } else if (index.value>=3 && index.value<=5) {
        span.style="background-color: #FFD700"
    } else if (index.value>=6 && index.value<=7) {
        span.style="background-color: #FFA500"
    } else if (index.value>=8 && index.value<=10) {
        span.style="background-color: #FF4500"
    } else {
        span.style="background-color: #FF0000"
    };
}

var shownForecastWeather = function(weather){
    //title
    forecastTitle.textContent="Five-Day-Forecast:";
    forecastInfoEl.textContent=""
    var forecast=weather.list;
    for(let i=1;i<6;i++){
    var dailyForecast=forecast[i];
    var forecastEl=document.createElement("div");
    forecastEl.classList="card bg-light text-primary m-2";
    //date
    var forecastDate=document.createElement("span")
    forecastDate.textContent=moment(weather.date.value).format("MM/DD/YYYY");
    forecastDate.classList="card-header text-center";
    forecastEl.appendChild(forecastDate);
    //weather icon
    var Icon=document.createElement("img")
    Icon.setAttribute("src", `https://openweathermap.org/img/w/${cityWeatherResponse.weather[0].description}.png`);
    Icon.classList="card-body text-center";
    forecastEl.appendChild(Icon);
    //temperature
    var forecastTempEl=document.createElement("span");
    forecastTempEl.textContent="Temperature:"+dailyForecast.main.temp+" °F";
    forecastTempEl.classList = "card-body text-center";
    forecastEl.appendChild(forecastTempEl);
    //humidity
    var forecastHumEl=document.createElement("span");
    forecastHumEl.textContent="Humidity:"+dailyForecast.main.humidity+" %";
    forecastHumEl.classList="card-body text-center";
    forecastEl.appendChild(forecastHumEl);
    //wind
    var forecastwindSpeedEl=document.createElement("span");
    forecastwindSpeedEl.textContent="Wind Speed:"+dailyForecast.wind.speed+" MPH";
    forecastwindSpeedEl.classList="card-body text-center";
    forecastEl.appendChild(forecastwindSpeedEl);

    forecastInfoEl.appendChild(forecastEl);
    };  
}

// add on click event listener 
$("#searchBtn").on("click", function(event) {
    event.preventDefault();
    var city=cityInputEl.value.trim();
    if(city){
        getCurrentWeather(city);
        getForecastWeather(city);
        cities.unshift({city});
        cityInputEl.value="";
    saveSearch();
    pastSearch(city);
};

var saveSearch=function(){
    localStorage.setItem("cities",JSON.stringify(cities));
    console.log(cities)
};
})

//click saved cities
$(document).on("click", "city", function() {
    var listCity = $(this).text();
    currentCondition(listCity);
})
