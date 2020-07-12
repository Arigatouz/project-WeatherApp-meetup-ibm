const projectData = {},
  cors = require("cors"),
  express = require("express"),
  app = express(),
  PORT = 8000,
  bodyParser = require("body-parser");

app.use(express.static("website"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/all", sendData);
function sendData(req, res) {
  res.send(projectData);
  console.log(projectData);

}

app.post("/addWeather", storeWeatherData);

function storeWeatherData(req, res) {
  projectData.date = req.body.date;
  projectData.temp = req.body.temperature;
  projectData.feelings = req.body.feelings;
  console.log("data received");
  res.send(projectData);
  console.log(projectData);
}
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT: ${PORT}`);
});
