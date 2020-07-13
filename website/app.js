// initializing Date
const date = new Date();
const newDate = `${
  date.getMonth() + 1
}/${date.getDate()}/${date.getFullYear()}`;
// working APi http://api.openweathermap.org/data/2.5/weather?q=egypt&units=metric&APPID=01ad071dfa318cd13176b18744267ba6&lang=en//
const keyAPI = "01ad071dfa318cd13176b18744267ba6";
const APILink =
  "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?";
const getFetch = async (method, zip, data) => {
  const result = await fetch(`${APILink}&APPID=${keyAPI}&zip=${zip}`, {
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
      return result.json().then((err) => {
        console.log(err);
        throw new Error("something went Wrong ");
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Request Can't be Completed");
  }
};
const postData = async (url, data) => {
  const resultPosted = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await resultPosted.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};
const getWeather = async (zip) => {
  console.log(feelings);
  const cityZip = document.getElementById("zipCode").value;
  zip = cityZip;
  await getFetch("get", zip)
    .then((newData) => {
      const feelingsInput = document.getElementById("feelings").value;
      console.log(feelingsInput);
      postData("/addWeather", {
        temperature: newData.main.temp,
        date: newDate,
        feelings: feelingsInput,
      });
      console.log(newData.main.temp);
      console.log(newDate);
    })
    .then(() => {
      updateUI("/all");
    });
};

const formButton = document.getElementById("form");
formButton.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeather();
  document.getElementById("zipCode").value = "";
});

const updateUI = async (url) => {
  const request = await fetch(url);
  try {
    const allData = await request.json();
    console.log(allData);
    document.getElementById("date").innerHTML = allData.date;
    document.getElementById("temp").innerHTML = allData.temp;
    document.getElementById("content").innerHTML = allData.feelings;
  } catch (error) {
    console.log("error", error);
    throw Error("can't get data ");
  }
};
