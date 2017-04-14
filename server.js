var Koa = require('koa');
var app = new Koa();
var request = require('koa-request');
var router = require('koa-router')();

app.use(router.routes()).use(router.allowedMethods());
app.listen(8080);

router.get('/', function*(next) {

    // When running locally, the local IP is returned. *Public* IP required for geolocation api call.
    if (this.ip == '::1') {
        var ip = '128.100.72.156'; // When running locally, manually assign 'mock' IP.
    } else {
        var ip = this.ip;
    }

    var geoApiReqOpts = {
        url: 'http://freegeoip.net/json/' + ip,
        headers: {
            'Accept': 'application/json'
        }
    };

    var geoApiRes = yield request(geoApiReqOpts),
        geodata = JSON.parse(geoApiRes.body);

    this.geolocation = {
        lat: geodata.latitude,
        lon: geodata.longitude,
        city: geodata.city,
        country: geodata.country_name
    };

    var weatherApiKey = '73077ca2afa73d4bd53aa2fa63fa367a',
        weatherApiParams = 'lat=' + geodata.latitude + '&lon=' + geodata.longitude + '&units=imperial&APPID=' + weatherApiKey;

    var weatherApiReqOpts = {
        url: 'http://api.openweathermap.org/data/2.5/weather?' + weatherApiParams,
        headers: {
            'Accept': 'application/json'
        }
    };

    var weatherApiRes = yield request(weatherApiReqOpts),
        weatherData = JSON.parse(weatherApiRes.body);

    this.weather = {
        temp: weatherData.main.temp + ' °F',
        humidity: weatherData.main.humidity + '%'
    };

    this.body = JSON.stringify({
        geolocation: this.geolocation,
        weather: this.weather
    }); // Stringify, else IE prompts client to download JSON file (all hail IE).

    yield next;
});