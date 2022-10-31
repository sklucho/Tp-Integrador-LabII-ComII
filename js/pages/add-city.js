submit = document.querySelector('#button');

submit.addEventListener("click", (e) => {

    e.preventDefault();

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
        newCity.toLowerCase();

        //Recorrer el array para validar que exista ciudad
        

        cities.push(newCity);
        localStorage.setItem("CITIES", JSON.stringify(cities));
    }

    addNewCityToLocalStorage();

    setTimeout(() => {
        window.location.reload();
    }, 3000);

})

