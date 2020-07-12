const endPointData = [],
  cors = require("cors"),
  express = require("express"),
  app = express(),
  PORT = 8000,
  bodyParser = require("body-parser");

app.use(express.static("website"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.render("index");
});
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT: ${PORT}`);
});
