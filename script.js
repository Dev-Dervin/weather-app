const APIkey = 'f225ed595595cbc33fb4514b662d696d';
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric'


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

async function checkWeather(){
    try {
        const response = await fetch(apiURL + `&q=${input.value}` + `&appid=${APIkey}`)
        const data = await response.json();

        const temp = document.querySelector('.temp');
        temp.textContent = `${data.main.temp}°`

        const city = document.querySelector('.city');
        city.textContent = data.name;

        const windspeed = document.querySelector('.windspeed');
        windspeed.textContent = `${data.wind.speed} km/h`

        const humidity = document.querySelector('.humid');
        humidity.textContent = `${data.main.humidity} %`

        const clouds = document.querySelector('.cloud');
        clouds.setAttribute('src',`images/${data.weather[0].main.toLowerCase()}.png`)

        input.value = '';
        
        console.log(data);
        console.log(data.weather[0].main.toLowerCase());
    } catch (error) {
        console.log('Error occured:', error.message);
    }
}
