# NOTAS

En versiones recientes de JS, puedes colocar de esta manera un objeto, cuando la llave y el valor se llaman igual. 

```js
const tweetsObj = {
        id: Date.now(), //identificador unico
        tweet: tweet 
    }
```

```js
const tweetsObj = {
        id: Date.now(), //identificador unico
        tweet
    }
```



//! Al dar enter en el textarea se ejecuta la funcion agregarTweet
document.addEventListener('DOMContentLoaded', () => {
    const tweet = document.querySelector('#tweet')
    tweet.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Evita el salto de línea
            formulario.submit(); // Envía el formulario
        }
    });
});