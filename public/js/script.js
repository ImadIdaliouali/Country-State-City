const countriesDiv = document.querySelector('.countries');
const statesDiv = document.querySelector('.states');
const citiesDiv = document.querySelector('.cities');

const API_KEY = 'b1MwS0RPOTJRYldsSmVDS0xWeVp0eXRXV1FVb09yM0R5Q255MVlUNg==';

let req = new XMLHttpRequest();
req.open('GET', 'https://api.countrystatecity.in/v1/countries', true);
req.setRequestHeader('X-CSCAPI-KEY', API_KEY);
req.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        let countries = JSON.parse(this.response);
        countries.forEach(country => {
            let countryDiv = document.createElement("div");
            countryDiv.setAttribute("class", "country");
            countryDiv.setAttribute("id", country.iso2);
            countryDiv.addEventListener("click", () => getStates(country.iso2));
            let countryName = document.createElement("p");
            countryName.textContent = country.name;
            countryDiv.appendChild(countryName);
            countriesDiv.appendChild(countryDiv);
        })
    }
}
req.send();

function getStates(iso2) {
    let url = `https://api.countrystatecity.in/v1/countries/${iso2}/states`;
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.setRequestHeader('X-CSCAPI-KEY', API_KEY);
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            statesDiv.innerHTML = '';
            citiesDiv.innerHTML = '';
            let states = JSON.parse(this.response);
            states.forEach(state => {
                let stateDiv = document.createElement('div');
                stateDiv.setAttribute('class', 'state');
                stateDiv.addEventListener('click', () => getCities(iso2, state.iso2));
                let stateName = document.createElement('p');
                stateName.textContent = state.name;
                stateDiv.appendChild(stateName);
                statesDiv.appendChild(stateDiv);
            })
        }
    }
    request.send();
}

function getCities(ciso, siso) {
    let url = `https://api.countrystatecity.in/v1/countries/${ciso}/states/${siso}/cities`;
    let city_req = new XMLHttpRequest();
    city_req.open('GET', url, true);
    city_req.setRequestHeader('X-CSCAPI-KEY', API_KEY);
    city_req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            citiesDiv.innerHTML = '';
            let cities = JSON.parse(this.response);
            cities.forEach(city => {
                let cityDiv = document.createElement('div');
                cityDiv.setAttribute('class', 'city');
                let cityName = document.createElement('p');
                cityName.textContent = city.name;
                cityDiv.appendChild(cityName);
                citiesDiv.appendChild(cityDiv);
            })
        }
    }
    city_req.send();
}