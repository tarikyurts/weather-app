async function weather(url) {
 try { const resp = await fetch(
  `http://api.weatherapi.com/v1/current.json?key=43906a8d2c914826a17103725213101&q=${url}`,
  {
    headers: {
      Authorization: "Bearer 43906a8d2c914826a17103725213101",
    },
  }
);
const result = await resp.json();
return result;
   
 } catch (error) {
   console.log('servis çalışmıyor')
 }
}

const istanbul = document.getElementById("istanbul");
const edirne = document.getElementById("edirne");
const ankara = document.getElementById("ankara");
const tekirdag = document.getElementById("tekirdag");

async function cityAPI(city) {
  return await weather(city);
}

async function app() {
  const istanbulAPI = await cityAPI("istanbul");
  const edirneAPI = await cityAPI("edirne");
  const ankaraAPI = await cityAPI("ankara");
  const tekirdagAPI = await cityAPI("tekirdag");

  function citybox(city, cityAPI, name, condition, temp, image) {
    var img = document.createElement("img");
    var name = document.createElement("span");
    name.classList.add("city-name");
    var condition = document.createElement("span");
    condition.classList.add("city-condition");
    var temp = document.createElement("span");
    temp.classList.add("city-temp");
    img.src = image;
    city.appendChild(name);
    city.appendChild(img);
    city.appendChild(condition);
    city.appendChild(temp);
    name.innerHTML = cityAPI.location.name;
    condition.innerHTML = cityAPI.current.condition.text;
    temp.innerHTML = Math.floor(cityAPI.current.temp_c) + "°C";
  }

  citybox(
    istanbul,
    istanbulAPI,
    istanbulAPI.location.name,
    istanbulAPI.current.condition.text,
    istanbulAPI.current.temp_c,
    istanbulAPI.current.condition.icon
  );

  citybox(
    edirne,
    edirneAPI,
    edirneAPI.location.name,
    edirneAPI.current.condition.text,
    edirneAPI.current.temp_c,
    edirneAPI.current.condition.icon
  );

  citybox(
    ankara,
    ankaraAPI,
    ankaraAPI.location.name,
    ankaraAPI.current.condition.text,
    ankaraAPI.current.temp_c,
    ankaraAPI.current.condition.icon
  );

  citybox(
    tekirdag,
    tekirdagAPI,
    tekirdagAPI.location.name,
    tekirdagAPI.current.condition.text,
    tekirdagAPI.current.temp_c,
    tekirdagAPI.current.condition.icon
  );

  async function search() {
    const userInput = document.getElementById("userInput");
    const searchButton = document.getElementById("search-btn");

    searchButton.addEventListener("click", async function searchBtn () {
      const searchedCityAPI = await cityAPI(userInput.value);
      const searchedCity = document.querySelector(".searched-city");
     
      citybox(
        searchedCity,
        searchedCityAPI,
        searchedCityAPI.location.name,
        searchedCityAPI.current.condition.text,
        searchedCityAPI.current.temp_c,
        searchedCityAPI.current.condition.icon
      );
    });
  }

  search();
}

app();
