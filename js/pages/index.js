const cardResult = document.querySelector('.card');
const select = document.querySelector('#city');
const submit = document.querySelector('#consult');
const form = document.querySelector('#form');
const kelvin = 273.15

submit.addEventListener('click', (e) => {
    
    e.preventDefault();
    
    if (select.value == '') {
        showError('Elija una opción...');
        return;
    }

    callApi(select.value);
})

const callApi = async(city) => {
    const apiID = 'b2721f652ea20e6fc0b1334a991bd7a3';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiID}`;

    const respuesta = await fetch(url);
    const resultado = await respuesta.json();

    if (resultado.cod=='404') {
        showError('No hay resultados...')
        return;
    }

    const{name, main} = resultado;
    if(!name) return null;

    

    
                
}

function cargarDatos(){
    let cities = localStorage.getItem("CITIES");
        if (cities) {
            cities = JSON.parse(cities);
            sel = document.querySelector(select);
            sel.innerHTML=`<option value="">${cities}</option>`;
        } else {
            cities = [];
        }
        return cities;
}





function showError(message){
    console.log(message);
    const alert = document.createElement('p');
    alert.classList.add('alert-message');
    alert.innerHTML = message;

    form.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 1000)
}


