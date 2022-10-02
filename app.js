const express = require('express');
const app = express();
const port = 3000;

const https = require('https');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
     res.sendFile(__dirname + '/index.html');
})

app.post('/', (req, res) => {
     const query = req.body.cityName;
     const apiKey = "4649ec92048ad8a65c62524fab26b19f"
     const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metric";
     https.get(url, (response) => {
          console.log(response.statusCode);
     
          response.on("data", (data) => {
               const weatherData = JSON.parse(data);
               const temp = weatherData.main.temp;
               const weatherDescription = weatherData.weather[0].description;
               const icon = weatherData.weather[0].icon;
               const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
               res.write("<p>The weather is currently " + weatherDescription + "</p>");
               res.write("<h1>The Temperature in " + query + " is " + temp + " degree Celsius.</h1>");
               res.write("<img src=" + imageURL + ">" );
               res.send();
          })
     })
})  


app.listen(port, () => {
     console.log(`Server is running on port ${port}`);
})