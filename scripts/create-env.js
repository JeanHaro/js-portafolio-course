const fs = require('fs');

// De esta forma tenemos este recurso, y ya estamos creando un archivo .env dentro del servidor
fs.writeFileSync('./.env', `API=${process.env.API}\n`)