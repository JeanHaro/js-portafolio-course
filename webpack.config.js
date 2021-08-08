// require() - nos va a ayudar a traer a este elemento path
// path ya está instalado en node, así que no hay que hacer una instalación de dependencias
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const DotEnv = require('dotenv-webpack');

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
        filename: '[name].[contenthash].js',
        // Para que pasen a los assets images y con el hast.exit y query
        assetModuleFilename: 'assets/images/[hash][ext][query]',
    },
    // Que queremos pasarle a la conf de webpack, con qué extensiones vamos a trabjar en este proyecto
    resolve: {
        // En un arreglo vamos a pasar las extensiones que vamos a utilizar
        // Como si trabajaras en otra reacción como ESBEL o React
        /* Vamos a tener que utilizar o establecer que tipo de extensiones vamos a tener que identificar webpack
        para leer los archivos que están dentro de nuestro proyecto */
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, './src/utils/'),
            '@templates': path.resolve(__dirname, './src/templates/'),
            '@styles': path.resolve(__dirname, './src/styles/'),
            '@images': path.resolve(__dirname, './src/assets/images/'),
        }
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
            },
            {
                // Le decimos que va a trabajar con css
                // Le damos esa lógica para poder reconocer los archivos css
                // le damos una regla para que también reconozca la extensión de el preprocesador Styles
                test: /\.css|.styl$/i,
                // Cuál es el elemento que vamos a tener
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader'
                ],
            },
            {
                // Expresión regular para establecer los elementos que vienen siendo la estructura de los archivos png
                test: /\.png/,
                type: 'asset/resource'
            },
            {
                // Expresión reguar para las fuentes descargadas
                test: /\.(woff|woff2)$/,
                // Para trabajar directamente con el loader
                use: {
                    loader: 'url-loader',
                    // Configuraciones que necesitamos para saber donde están los archivos
                    options: {
                        // Caracteristicas que tiene nuestros recursos en tamaño y en el tipo de formato que tiene
                        limit: 10000,
                        // Tipo de dato
                        mimetype: 'aplication/font-woff',
                        // Respete el nombre y la extesión que tiene 
                        name: "[name].[contenthash].[ext]",
                        // Hacia donde se va a enviar
                        outputPath: "./assets/fonts/",
                        publicPath: "../assets/fonts/",
                        esModule: false,
                    }
                }
            }
        ]
    },
    plugins: [
        // Plugins que utilizamos
        new HtmlWebpackPlugin({
            /* Le damos un objeto donde estarán las configuraciones que van a añadir a lo que viene siendo este 
            plugin */
            // inject - Para que haga la inserción de los elementos
            inject: true,
            // template - Darle el template su ubicación
            template: './public/index.html',
            // filename - Resultado de esta preparación de HTML
            // Va a tomar nuestro template y lo va a transformar con los elementos que nos va a indicar
            // También lo va poner en la carpeta de distribution con el nombre de index.html
            filename: './index.html'
        }),

        new MiniCssExtractPlugin({
            // El hash nos va a permitir identificar el build que estamos haciendo 
            // Si hay cambios el hash va a cambiar
            // Optimizamos nuestro proyecto para que obtenga los cambios necesarios de cada build
            // La optimización que se está dando a CSS como también a JavaScript
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            // Cuales serán los elementos que vamos a utilizar
            patterns: [
                {
                    // Vamos a tener los elementos 
                    // Desde donde y hacia donde lo vamos a mover
                    // resolver - para saber donde estamos ubicados
                    // src donde esta nuestros recursos
                    // assets/images - es la carpeta que estamos usando 
                    // Acá se encuentran los archivos que vamos a mover
                    from: path.resolve(__dirname, "src", "assets/images"),
                    // Hacia donde lo movemos
                    to: "assets/images"
                }
            ]
        }),
        new DotEnv(),
    ],
    // optimización
    optimization: {
        minimize: true,
        // Agregar la configuración de lo que acabamos de instalar
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    }
}