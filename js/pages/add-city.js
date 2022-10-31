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

    function addNewCityToLocalStorage() {
        let cities = getCitiesFromLocalStorage();
        let newCity = document.querySelector('#addcity').value;
        let indice = cities.indexOf(newCity);

        
        //validaciones
        if (indice !== -1) {
            document.querySelector('#yellow').style.display = 'block';
        } else if (newCity == 0 || !isNaN(newCity)) {
            document.querySelector('#red').style.display = 'block';
        } else {
            document.querySelector('#green').style.display = 'block';
            cities.push(newCity);
        }

        localStorage.setItem("CITIES", JSON.stringify(cities));
    }

    //iniciando la función
    addNewCityToLocalStorage();

    //definiendo el tiempo en el que van a aparecer los carteles de colores
    setTimeout(() => {
        window.location.reload();
    }, 3000);

})

