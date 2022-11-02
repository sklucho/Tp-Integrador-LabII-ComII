//guardando el elemento button en una variable
submit = document.querySelector('#button');


//evento que se activa al hacer click en el button
submit.addEventListener("click", (e) => {

    //deteniendo el accionar por defecto del formulario
    e.preventDefault();

    //funciones

    //animar el cargando
    async function cargando(){
        let carga = document.querySelector('#loading')
        carga.innerHTML+=`<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
       <rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2">
         <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" />
         <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
         <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
       </rect>
       <rect x="8" y="10" width="4" height="10" fill="#333"  opacity="0.2">
         <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
         <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
         <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
       </rect>
       <rect x="16" y="10" width="4" height="10" fill="#333"  opacity="0.2">
         <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
         <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
         <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
       </rect>
     </svg>`
    
      setTimeout(() => {
       carga.style.display= 'none';
    }, 1000);  
    }

    //obteniendo valores desde el LocalStorage
    function getCitiesFromLocalStorage() {
        let cities = localStorage.getItem("CITIES");
        if (cities) {
            cities = JSON.parse(cities);
        } else {
            cities = [];
        }
        return cities;
    }

    
    //añadiendo valores al LocalStorage
    async function addNewCityToLocalStorage() {
        let cities = getCitiesFromLocalStorage();
        let newCity = document.querySelector('#addcity').value;
        let indice = cities.indexOf(newCity);


        //consumiendo la API
        const apiID = 'b2721f652ea20e6fc0b1334a991bd7a3';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiID}`;

        //validaciones
        if (newCity == '') {
            document.querySelector('#red1').style.display = 'block';
        } else {

            //recorriendo la url de la API
            const response = await fetch(url);
            //convirtiendo los datos de la url en objeto JSON
            const datos = await response.json()
                
                //promesa con condicionales
                .then(ciudad => {

                    if (ciudad.cod === '404') {
                        cargando();
                        setTimeout(() => {
                        document.querySelector('#red').style.display = 'block';
                        }, 1000)
                    } else if (indice !== -1) {
                        cargando();
                        setTimeout(() => {
                        document.querySelector('#yellow').style.display = 'block';
                        }, 1000)
                    } else {
                        cargando();
                        cities.push(newCity);
                        localStorage.setItem("CITIES", JSON.stringify(cities));
                        setTimeout(() => {
                            document.querySelector('#green').style.display = 'block';
                        }, 1000); 
                    }
                })
        }

        //definiendo el tiempo en que la página se va a recargar
        setTimeout(() => {
            window.location.reload();
        }, 3000);
        
    }


    //inicializando función
    addNewCityToLocalStorage();

})





