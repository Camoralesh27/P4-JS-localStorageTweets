//* VARIABLES
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
const tweetInput = document.querySelector('#tweet'); //! agregado por mi - Capturar el textarea 

let tweets = [];

//* EVENT LISTENERS


eventListeners();

function eventListeners() {
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || []; //Almacenar los tweets en el localStorage
        crearHTML();
    });


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

    //Mostrar feedback visual
    mostrarConfirmacion();

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
            //Agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //Añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            //Crear el HTML
            const li = document.createElement('li');

            //Anadir el HTML
            li.textContent = tweet.texto;

            //Asignar el boton
            li.appendChild(btnEliminar);

            //insertar en el HTML
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
} 

// Agregar los tweets a LocalStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Eliminar tweet
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id );

    crearHTML();
}

//Limpiar HTML
function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

//Muestra un mensaje de confirmacion
function mostrarConfirmacion() {
    // Crear el círculo verde con el icono
    const confirmacion = document.createElement('div');
    confirmacion.classList.add('confirmacion');

    // Añadir icono de pulgar hacia arriba
    confirmacion.innerHTML = '👍';

    // Insertar en el DOM
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(confirmacion);

    // Eliminarlo después de 2 segundos
    setTimeout(() => {
        confirmacion.remove();
    }, 3000);
}