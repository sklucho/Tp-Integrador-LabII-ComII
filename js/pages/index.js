const cardResult = document.querySelector('#card');
const select = document.querySelector('#city');
const submit = document.querySelector('#consult');
const cartel = document.querySelector('#cartel');

//función para poner en uppercase las primera letra de cada palabra
const capitalizar = (string) => {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

submit.addEventListener('click', (e) => {
    
    e.preventDefault();


    //haciendo desaparecer el cartel de error despues de 3 seg
    if (select.value == '') {
        cartel.style.display= 'block';
        setTimeout(() => {
            cartel.style.display= 'none';
        }, 3000);
    }

    //llamando a la API
    callApi(select.value);
})

const callApi = async(city) => {
    const apiID = 'b2721f652ea20e6fc0b1334a991bd7a3';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiID}`;

    await fetch(url)
        .then(respuesta => respuesta.json())
        .then(ciudades => {
            let temp1 = `<div class='card'>
            <h3>${capitalizar(city)}</h3>
            <img src="https://openweathermap.org/img/wn/${ciudades.weather[0].icon}@2x.png" alt="logo" width="100">
            <p>Temperatura: ${parseInt(ciudades.main.temp - 273.15)}°</p>
            <p>Sencación Térmica: ${parseInt(ciudades.main.feels_like - 273.15)}°</p>
            <p>Humedad: ${ciudades.main.humidity}%</p>
            <p>Velocidad del Viento: ${parseInt(ciudades.wind.speed * 3.6)}km/h</p>
            <p>Presión: ${ciudades.main.pressure} mbar</p>
            <p>Visibilidad: ${ciudades.visibility / 1000} km</p></div>`

            cardResult.style.display= 'inline';
            cardResult.innerHTML+=temp1; 
        })
    }
                  


let local = JSON.parse(localStorage.getItem('CITIES'));
let temp = '';

local.forEach(ciudades => {
    temp = `<option value='${ciudades}'>${capitalizar(ciudades)}</option>`;
    select.innerHTML+=temp;
});





