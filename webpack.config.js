// require() - nos va a ayudar a traer a este elemento path
// path ya está instalado en node, así que no hay que hacer una instalación de dependencias
const path = require('path');

// Vamos a crear un modulo que vamos a exportar con un objeto con la configuración deseada
module.exports = {
    // Acá añadiremos todas esas configuraciones
    // entry - nos va a permitir decir cual es el punto de entrada de nuestra aplicación
    // Es importante porque debemos decirle cual es el elemento inicial de nuestra aplicación
    entry: './src/index.js',
    // output - es hacia donde vamos a enviar lo que va a preparar webpack
    // Podemos establecer un nombre de carpeta, como un nombre de archivo
    // En un objeto vamos añadir los elementos internos para trabajar
    output: {
        // El primero será path, y vamos a usar el path que traimos en la parte inicial, para tener el uso de resolve
        /* Nos va a permitir saber dónde se encuentra nuestro proyecto, en qué directorio y poderlo utilizar 
        de esta forma no tener que tener un problema particularmente con el nombre de la carpeta, dónde estoy 
        posicionado
        Así cuando enviamos esto a un servidor en la nube para preparar nuestro proyecto va a utilizar
        el directorio, que obviamente esta encontrandose este repositorio o este proyecto, entonces garantizamos que 
        siempre va a encontrar la carpeta donde se ubica este proyecto*/
        // En el segundo parámetro, Después podemos poner el nombre que deseemos que nosotros deseemos
        // Te recomiendo usar DIST, ya que es un estandar dentro que viene haciendo la compilación de los proyectos
        path: path.resolve(__dirname, 'dist'),

        // Poner un nombre al resultante del JavaScript que se va a unificar
        // Le colocamos como main, también podemos encontrarlo como bundle
        filename: 'main.js',
    },
    // Que queremos pasarle a la conf de webpack, con qué extensiones vamos a trabjar en este proyecto
    resolve: {
        // En un arreglo vamos a pasar las extensiones que vamos a utilizar
        // Como si trabajaras en otra reacción como ESBEL o React
        /* Vamos a tener que utilizar o establecer que tipo de extensiones vamos a tener que identificar webpack
        para leer los archivos que están dentro de nuestro proyecto */
        extensions: ['.js']
    },
    module: {
        rules: [
            // Añadiremos la configuración de babel
            /* rules - las reglas que vamos a establecer de como vamos a trabajar con diferentes tipos de archivos 
            o elementos dentro de este proyecto */
            {
                // test - este test nos va a permitir saber que tipo de extensiones vamos a utilizar
                // expresiones regulares que nos van a decir como puedo trabajar con diferentes extensiones
                // /\.m <- cualquier archivo que empiece con m, en este caso de module (extension mjs)
                // ? - o cualquier archivo que empiece su extensión con js
                // $ - cierra
                // / - cerramos nuestra instrucción
                test: /\.m?js$/,
                /* Procedemos a excluir, ya que no queremos que utilice los elementos JavaScript o modulos que 
                se encuentren dentro de node_modules porque sino la aplicación se rompería totalmente */
                // no utilice nada de node_modules
                exclude: /node_modules/,
                use: {
                    // para pasarle el loader que utilizaremos
                    loader: 'babel-loader',
                }
            }
        ]
    },
}