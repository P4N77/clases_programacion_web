document.addEventListener("DOMContentLoaded", function () {

    const apiKey = '3b5accbcce6e3e2a8a33da60a746dfc3';

    const codigosPais = {
        "Argentina": "AR",
        "España": "ES",
        "México": "MX",
        "Francia": "FR",
        "EEUU": "US",
        "Australia": "AU",
        "Canadá": "CA",
        "Bolivia": "BO",
        "Chile": "CL",
        "Colombia": "CO",
        "Cuba": "CU",
        "Guatemala": "GT",
        "Honduras": "HN",
        "Nicaragua": "NI",
        "Panamá": "PA",
        "Paraguay": "PY",
        "Perú": "PE",
        "Uruguay": "UY",
        "Venezuela": "VE",
        "Alemania": "DE",
        "Bélgica": "BE", 
        "Dinamarca": "DK",
        "Finlandia": "FI",
        "Grecia": "GR",
        "Hungría": "HU",
        "Irlanda": "IE",
        "Islandia": "IS",
        "Italia": "IT",
        "Japón": "JP",
        "Malta": "MT",
        "Noruega": "NO",
        "Polonia": "PL",
        "Portugal": "PT",
        "Reino Unido": "GB",
        "Rumania": "RO",
        "Suiza": "CH",
        "Turquía": "TR",
        "Vietnam": "VN",
        "Afganistán": "AF",
        "Albania": "AL",
        "Armenia": "AM",
        "Azerbaiyán": "AZ",
        "Bahréin": "BH",
        "Bangladesh": "BD",
        "Bosnia y Herzegovina": "BA",
        "Burkina Faso": "BF",
        "Burundi": "BI",
        "Cabo Verde": "CV",
        "Camerún": "CM",
        "Chad": "TD",
        "Comoras": "KM",
        "Costa Rica": "CR",
    };

    document.getElementById("consultarClima").addEventListener("click", function () {
        const pais = document.getElementById("pais").value;
        const ciudad = document.getElementById("ciudad").value;
        const resultado = document.getElementById("resultado");

        // Validar que se ingrese una ciudad
        if (!ciudad) {
            resultado.innerHTML = '<p>Por favor, ingresa una ciudad.</p>';
            return;
        }

        // Obtener código del país seleccionado
        const codigoPais = codigosPais[pais];
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${codigoPais}&appid=${apiKey}&units=metric&lang=es`;

        // Hacer la petición con Fetch API
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status === 404 ? 
                        'La ciudad o el país ingresado no existe. Por favor, verifica la información y vuelve a intentarlo.' 
                        : 'Error al obtener la información.');
                }
                return response.json();
            })
            .then(data => {
                // Capturar información del clima
                const descripcion = data.weather[0].description;
                const temperatura = data.main.temp;
                const humedad = data.main.humidity;

                // Mostrar resultado en el contenedor
                resultado.innerHTML = `

                <article class="widget">
                    <div class="weatherIcon"><i class="wi wi-day-cloudy"></i></div>
                    <div class="weatherInfo">
                    <div class="temperature"><span>${temperatura} °C</span></div>
                        <div class="description">    
                            <div class="weatherCondition">${ciudad}</div>    
                            <div class="place">${pais}</div>
                        </div>
                    </div>
                    <div class="date">
                        <p>
                            ${descripcion}
                        </p>
                    </div>
                </article>
                `;
            })
            .catch(error => {
                resultado.innerHTML = `<p>${error.message}</p>`;
            });
    });
});
