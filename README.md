# get-my-weather
A KoaJS application which uses external APIs to fetch weather data relative to the request's public IP address.

<h2>How it works</h2>

<ul>
  <li>The IP of the request is grabbed: 
  <p><code>var ip = this.ip;</code></p>
  </li>
  <li>A request is made to the <a href="https://freegeoip.net/?q=2a02:c7d:ccb0:5500:6cd3:a850:f2ce:d9f3">freegeoip.net API</a>, with the IP appended to the query:
    <p><code>url: 'http://freegeoip.net/json/' + ip</code></p>
  </li>
  <li>The API response yields the lon-lat coordinates associated with the IP address:
    <p><code>geodata = JSON.parse(geoApiRes.body);</code></p>
    <p><code>this.geolocation = { lat: geodata.latitude, lon: geodata.longitude, ...};</code></p>
  </li>
  <li>A second API call is made, this time to <a href="https://openweathermap.org/api">OpenWeatherMap API</a>: 
    <p><code>weatherApiParams = 'lat=' + geodata.latitude + '&lon=' + geodata.longitude + ...</code></p>
  </li>
  <li>The second API response yeilds various weather data associated with the lat-lon coordinates provided:
    <p><code>weatherData = JSON.parse(weatherApiRes.body);</code></p>
    <p><code>this.weather = { temp: weatherData.main.temp + ' °F', humidity: weatherData.main.humidity + '%' };</code></p>
  </li>
</ul>

<h2>Installation</h2>

<h3>Prerequisites</h3>
<ul>
	<li>NodeJS & NPM</li>
	<p><i>Koa requires node v7.6.0 or higher for ES2015 and async function support.</i></p>
</ul>

<h3>Instructions</h3>
<ul>
	<li>Download the repo: <code>git clone https://github.com/callum-messiter/get-my-weather.git</code></li>
	<li><code>cd get-my-weather</code></li>
	<li>Install dependencies: <code>npm install</code></li>
	<li>Run it locally: <code>npm start</code></li>
	<li>Visit <a href="http://localhost:8080/">http://localhost:8080/</a> in the browser</li>
</ul>
