// working APi http://api.openweathermap.org/data/2.5/weather?q=egypt&units=metric&APPID=01ad071dfa318cd13176b18744267ba6&lang=en//
const keyAPI = "01ad071dfa318cd13176b18744267ba6";
const APILink =
  "http://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=";
const Metric = "&units=metric&";
const weatherList = document.querySelector(".weather__list");
const getFetch = async (method, name, data) => {
  const result = await fetch(`${APILink}${name}${Metric}APPID=${keyAPI}`, {
    method: method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "same-origin",
  });
  try {
    console.log(result.status);
    if (result.status >= 200 && result.status < 300) {
      const newData = await result.json();
      return newData;
    } else {
      return response.json().then((err) => {
        console.log(err);
        throw new Error("something went Wrong ");
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Request Can't be Completed");
  }
};

const getWeather = async (name) => {
  const city = document.getElementById("city").value;
  name = city;
  await getFetch("get", name).then((newData) => {
    updateUI(newData);
  });
};

const formButton = document.getElementById("form");
formButton.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeather();
  document.getElementById("city").value = "";
});

const updateUI = (passedInformation) => {
  const postTemplate = document.getElementById("post-template");
  const postEl = document.importNode(postTemplate.content, true);
  postEl.querySelector(
    "h3"
  ).textContent = `This Weather is For ${passedInformation.name}`;
  postEl.querySelector(
    "span"
  ).textContent = `Weather Clouds :  ${passedInformation.weather[0].main} `;
  postEl.querySelector(
    ".temp"
  ).textContent = `Temperature is ${passedInformation.main.temp} celsius `;
  postEl.querySelector(
    ".min__temp"
  ).textContent = `Min temperature is ${passedInformation.main["temp_min"]} celsius `;
  postEl.querySelector(
    ".max__temp"
  ).textContent = `Max temperature is ${passedInformation.main["temp_max"]} celsius `;
  postEl.querySelector(
    ".pressure"
  ).textContent = `pressure is ${passedInformation.main.pressure} pascal `;
  postEl.querySelector(
    ".wind__speed"
  ).textContent = `wind speed is ${passedInformation.wind.speed} knots `;
  postEl.querySelector(
    ".wind__degree"
  ).textContent = `wind direction is ${passedInformation.wind.deg} degrees `;
  weatherList.appendChild(postEl);
};
