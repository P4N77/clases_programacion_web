$(document).ready(function() {
    // espera a que el documento este totalmente cargado
    // constante con mi api key
    const apiKey = '3b5accbcce6e3e2a8a33da60a746dfc3';

    // constantes con los codigos de los paises
    const codigosPais = {
        "Argentina": "AR",
        "España": "ES",
        "México": "MX",
        "Francia": "FR",
        "EEUU": "US"
    };

    $('#consultarClima').click(function() {
        // captura los dos valores del input y el select y los guarda en dos constantes
        const pais = $('#pais').val();
        const ciudad = $('#ciudad').val();

        // si no se ingresa una ciudad, devolvera un mensaje
        if (!ciudad) {
            $('#resultado').html('<p>Por favor, ingresa una ciudad.</p>');
            return;
        }

        // Verificar si la ciudad corresponde al país seleccionado
        const codigoPais = codigosPais[pais];
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${codigoPais}&appid=${apiKey}&units=metric&lang=es`;

        $.get(url, function(data) {
            // se captura la informacion traida por la api 
            const descripcion = data.weather[0].description;
            const temperatura = data.main.temp;
            const humedad = data.main.humidity;

            // se genera una constante que tendra contenido html
            const resultado = `
                <h3>Clima en ${ciudad}, ${pais}</h3>
                <p><strong>Descripción:</strong> ${descripcion}</p>
                <p><strong>Temperatura:</strong> ${temperatura} °C</p>
                <p><strong>Humedad:</strong> ${humedad} %</p>
            `;
            // se envia el resultado al contendor de resultado
            $('#resultado').html(resultado);

        }).fail(function(jqXHR,) {
            // Si la ciudad no existe o hay otro error
            let mensajeError = 'Error al obtener la información.';

            if (jqXHR.status === 404) {
                // si el error que captura el objeto de respuesta es 404 (osea no existe) generara error
                mensajeError = 'La ciudad o el país ingresado no existe. Por favor, verifica la información y vuelve a intentarlo.';
            } else {
                mensajeError = `Error`;
            }

            $('#resultado').html(`<p>${mensajeError}</p>`);
        });
    });
});
