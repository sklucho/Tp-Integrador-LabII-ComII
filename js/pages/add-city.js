//guardando el elemento button en una variable
submit = document.querySelector('#button');

//declarando un evento con función de flecha
submit.addEventListener("click", (e) => {

    //deteniendo el accionar por defecto del formulario
    e.preventDefault();

    //funciones
    function getCitiesFromLocalStorage() {
        let cities = localStorage.getItem("CITIES");
        if (cities) {
            cities = JSON.parse(cities);
        } else {
            cities = [];
        }
        return cities;
    }

    async function addNewCityToLocalStorage() {
        let cities = getCitiesFromLocalStorage();
        let newCity = document.querySelector('#addcity').value;
        let indice = cities.indexOf(newCity);


        //validaciones
        const apiID = 'b2721f652ea20e6fc0b1334a991bd7a3';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiID}`;

        if (newCity == '') {
            document.querySelector('#red1').style.display = 'block';
        } else {

            const response = await fetch(url);
            const datos = await response.json()
                .then(ciudad => {
                    if (ciudad.cod === '404') {
                        document.querySelector('#red').style.display = 'block';
                    } else if (indice !== -1) {
                        document.querySelector('#yellow').style.display = 'block';
                    } else {
                        cities.push(newCity);
                        localStorage.setItem("CITIES", JSON.stringify(cities));
                        document.querySelector('#green').style.display = 'block';
                    }
                })


            if (indice !== -1) {
                document.querySelector('#yellow').style.display = 'block';
            }
        }

    }


    //iniciando la función
    addNewCityToLocalStorage();

    //definiendo el tiempo en el que van a aparecer los carteles de colores
    setTimeout(() => {
        window.location.reload();
    }, 3000);

})



