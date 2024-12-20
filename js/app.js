//* VARIABLES
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
const tweetInput = document.querySelector('#tweet'); //! agregado por mi - Capturar el textarea 

let tweets = [];

//* EVENT LISTENERS


eventListeners();

function eventListeners() {
    // Cuando se envía el formulario
    formulario.addEventListener('submit', agregarTweet);


    //! Agregado por mi - Prevenir salto de línea con Enter en el textarea
    tweetInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Evita el salto de línea
            formulario.dispatchEvent(new Event('submit')); // Simula el envío del formulario
        }
    });
}





//* FUNCIONES
function agregarTweet(e) {
    e.preventDefault();

    //Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    //validacion
    if (tweet === '') {
        mostrarError('El tweet esta vacio, agrega un texto a tú tweet.');

        return; //! evita que se ejecuten más lineas de código (por el error)
    } 

    const tweetsObj = {
        id: Date.now(), //identificador unico
        texto: tweet 
    }

    // Añadir al arreglo de tweets
    tweets = [...tweets, tweetsObj];

    // Crear HTML
    crearHTML();

    //Reiniciar el formulario
    formulario.reset();
}

// Mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertar el error en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Elimina la alerta después de 3seg
    setTimeout(() => {
        mensajeError.remove();
    }, 2000);
    
}

// Muestra un listado de los tweets
function crearHTML() {
    limpiarHTML();

    if( tweets.length > 0 ) {
        tweets.forEach( tweet => {
            //Crear el HTML
            const li = document.createElement('li');

            //Anadir el HTML
            li.textContent = tweet.texto;

            //insertar en el HTML
            listaTweets.appendChild(li);
        });
    }
} 

//Limpiar HTML
function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}