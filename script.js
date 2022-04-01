var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

let weather = {
    "apiKey": "0d7d76465d7a5aabea3388833da72b16",
    fetchWeather: function(city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=metric&appid=" 
        + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/h";

        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900?" + name + "')"; 
        document.querySelector(".weather").classList.remove("loading"); //css hidden no longer applies
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};
// below the querySelector looks for button under class search
document.querySelector(".search button").addEventListener("click", function(){
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if (event.key == "Enter") {
        weather.search();
    }
});

// get ip of user so that the weather is already displayed when site is opened
function ipLookUp () { 
    $.ajax('http://ip-api.com/json')
    .then(
        function success(response) {
            weather.fetchWeather(response.city);
        },
        function fail(data, status) {
            console.log('Request failed.  Returned status of',
                        status);
        }
    );
  };

window.onload = function(){
    ipLookUp();
};