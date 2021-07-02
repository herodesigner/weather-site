const api = {
  key: '057771db11c6c9104abf685384c065fe',
  baseurl: 'http://api.openweathermap.org/data/2.5/',
}

const searchbox = document.querySelector('.search-box');
const button = document.querySelector('.btn');
const error = document.querySelector('.error');

button.addEventListener('click', ()=> {
  const location = searchbox.value;
  fetch(`${api.baseurl}weather?q=${location}&units=metric&APPID=${api.key}`)
    .then(weather=>{
      return weather.json();
    })
    .then(displayData)
    .catch (()=> {
      error.textContent = "Please enter a valid city"
    });

    error.textContent = '';
})

function displayData (weather) {
    const city = document.querySelector('.city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    const today = new Date();
    const date = document.querySelector('.date');
    date.innerHTML = dateFunction(today);

    const temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}` + '˚C'

    const weatherIcon = document.querySelector('.icon');
    weatherIcon.src = `https://openweathermap.org/img/wn/${weather.weather[0]["icon"]}@2x.png`;

    const description = document.querySelector('.description');
    description.innerHTML = `${weather.weather[0].main}`;

    const tempRange = document.querySelector('.hi-low');
    tempRange.innerHTML = `${Math.round(weather.main.temp_min)}˚C / ${Math.round(weather.main.temp_max)}˚C`;

    // document.body.style.backgroundImage = `https://source.unsplash.com/1600x900/?' + ${weather.name} + '`
}

function dateFunction (today) {
  let months = ['Jan','Feb','Mar','Apr','May','June','July',
  'Aug','Sep','Oct','Nov','Dec'];
  let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday',
  'Friday','Saturday',];

  let day = days[today.getDay()];
  let date = today.getDate();
  let month = months[today.getMonth()];
  let year = today.getFullYear();

  return `${day}, ${date} ${month} ${year}`
}