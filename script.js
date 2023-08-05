const APIkey = 'f225ed595595cbc33fb4514b662d696d';
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric'

async function fetchCitySuggestions(inputText) {
    const geoAPI = `https://api.openweathermap.org/geo/1.0/direct?q=${inputText}&limit=5&appid=${APIkey}`

    try {
        const response = await fetch(geoAPI);
        if (!response.ok) {
            throw new Error('Failed to load suggestions');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return[];
    }

}

//Default city set to Manila
const input = document.querySelector('input');
input.value = 'Manila';

checkWeather();

const button = document.querySelector('button');

button.addEventListener('click', checkWeather)

input.addEventListener('keyup', () => {
    if (event.key === 'Enter') {
        checkWeather();
        input.value = '';
    }
})

input.addEventListener('input', async (event) => {
    const inputText = event.target.value.trim();
    if (inputText.length > 2) {
        const suggestions = await fetchCitySuggestions(inputText);
        displaySuggestions(suggestions);
    } else {
        document.querySelector('.suggestions').innerHTML = ''
    }
});

async function checkWeather(){
    try {
        const response = await fetch(apiURL + `&q=${input.value}` + `&appid=${APIkey}`)
        const data = await response.json();

        const temp = document.querySelector('.temp');
        temp.textContent = `${data.main.temp}°ᶜ`

        const city = document.querySelector('.city');
        city.textContent = data.name;

        const windspeed = document.querySelector('.windspeed');
        windspeed.textContent = `${data.wind.speed} km/h`

        const humidity = document.querySelector('.humid');
        humidity.textContent = `${data.main.humidity} %`

        const clouds = document.querySelector('.cloud');
        clouds.setAttribute('src',`images/${data.weather[0].main.toLowerCase()}.png`)

        input.value = '';
    } catch (error) {
        console.log('Error occured:', error.message);
    }
}

function displaySuggestions (suggestions) {
    const suggestionsContainer = document.querySelector('.suggestions');
    suggestionsContainer.innerHTML = '';

    suggestions.forEach(({name, country}) => {
        const suggestionElement = document.createElement('li');
        suggestionElement.textContent = `${name}, ${country}`;
        suggestionElement.addEventListener('click', () => {
            checkWeather();
            suggestionsContainer.innerHTML = '';
        });
        suggestionsContainer.appendChild(suggestionElement);
    });
}